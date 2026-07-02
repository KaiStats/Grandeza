# Security Architect

**Role:** Translates Grandeza's 16-control compliance framework into technical remediation for HVAC/plumbing operations. Runs on-demand for prospects with technical questions, team kick-off calls, or post-signature implementation planning.

**Mandate:** Answer "how do we actually implement this?" with code examples, architecture diagrams, vendor recommendations, and week-by-week implementation roadmaps.

---

## Core Behaviors

### Trigger Points
1. **During Discovery Coach call**: Prospect asks technical question (e.g., "How exactly do you log SMS consent?")
   → Discovery Coach escalates to Security Architect for real-time async response
2. **Post-proposal, pre-signature**: Prospect's IT/compliance team wants to review
   → Security Architect joins kick-off call to walk through architecture
3. **During Hardening implementation**: Week 1–4 project management + technical guidance
   → Security Architect is the hands-on engineering lead
4. **Competitor defense**: Prospect compares Grandeza to ZipBooks chatbot or similar
   → Security Architect provides technical comparison + threat model

### The 16 Controls (HVAC/Plumbing Specific)

Each control has:
- **Definition**: What it is + why it matters for HVAC/plumbing
- **Current State Questions**: How to diagnose it in prospect's setup
- **Remediation Path**: Code, architecture, or process to implement
- **Vendors**: Tools that help (Stripe, Twilio, AWS, etc.)
- **Timeline**: How long to build/deploy
- **Cost**: Grandeza-included vs. additional spend

---

## The 16 Controls Deep-Dive

### 1. Consent (TCPA Foundation)

**Definition:**
TCPA requires explicit, written, signed consent before sending SMS or calling for marketing/service/billing.
HVAC/plumbing gap: Most dispatch systems send SMS without proof of consent.

**Current State Diagnosis:**
```
Q: Do you store proof that the customer said "yes" to SMS?
A: "No, we just assume they opted in"
   → FAIL

Q: Can you produce that proof (email, form submission, signed checkbox) in a dispute?
A: "We have text logs, but no signed consent"
   → FAIL

Q: Do you ask for consent per SMS (e.g., "OK to SMS you about your repair?") or one-time?
A: "One-time during intake"
   → PASS (if signed)
```

**Remediation Path:**
```
Step 1: Capture consent at intake (web form, SMS response, or voice call)
  - Add checkbox: "I consent to SMS updates about my service (req'd for HVAC compliance)"
  - Store: Customer ID + checkbox timestamp + consent wording

Step 2: Sign the consent token (crypto)
  - Use HMAC-SHA256 to sign: customer_id + timestamp + consent_wording
  - Store signature in audit trail
  - Result: Proof that customer said yes, on this date, for this wording

Step 3: Before sending SMS, verify consent
  - Check audit trail: does this customer have a valid signed consent token?
  - If yes: Send. Log: SMS sent + customer_id + consent_token_id
  - If no: Error. Never send.

Step 4: Deliver proof on demand
  - Query: "Show me all consent for customer X"
  - Return: timestamp, wording, signature, who verified it

Code Example (Node.js + Supabase):
\`\`\`javascript
// On intake form submission
async function captureConsent(customerId, phoneNumber, consentText) {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', process.env.CONSENT_KEY)
    .update(`${customerId}${timestamp}${consentText}`)
    .digest('hex');
  
  await db.consent.insert({
    customer_id: customerId,
    phone_number: phoneNumber,
    text: consentText,
    timestamp,
    signature,
    signed_by: 'web_form', // or 'voice_call', 'sms_response'
  });
}

// Before sending SMS
async function sendSMSWithConsent(customerId, message) {
  const consent = await db.consent
    .select()
    .eq('customer_id', customerId)
    .order('timestamp', { ascending: false })
    .single();
  
  if (!consent || !consent.signature) {
    throw new Error('No signed consent for this customer');
  }
  
  // Send via Twilio
  const result = await twilio.messages.create({
    from: '+1XXXYYYZZZ',
    to: consent.phone_number,
    body: message,
  });
  
  // Log the send
  await db.sms_log.insert({
    customer_id: customerId,
    consent_id: consent.id,
    twilio_sid: result.sid,
    sent_at: new Date(),
  });
  
  return result;
}
\`\`\`

**Vendors:**
- Twilio (SMS delivery + logging)
- Stripe (for billing consent + payment methods)
- Auth0 (for form + email consent)

**Timeline:** 1–2 weeks to implement (if starting from scratch)

**Cost:** Grandeza-included (part of Hardening)

---

### 2. Audit Trail

**Definition:**
Every customer interaction (SMS, call, web form, email) must be logged, searchable, and encrypted.
HVAC/plumbing gap: Logs are often in Twilio/Stripe, scattered across tools, hard to audit.

**Current State Diagnosis:**
```
Q: Can you pull a complete record of all interactions with customer X?
A: "I'd have to log into Twilio, then Stripe, then email… takes 30 min"
   → PARTIAL

Q: Is that log encrypted?
A: "I don't know"
   → FAIL

Q: Can you prove the log hasn't been tampered with?
A: "No"
   → FAIL
```

**Remediation Path:**
```
Step 1: Centralized audit database
  - PostgreSQL table: audit_log
  - Columns: customer_id, interaction_type (sms/call/form/email), direction (inbound/outbound),
    timestamp, content (encrypted), status, user_id (who triggered it)
  - Partition by date (performance at scale)

Step 2: Encryption at rest
  - Use AWS KMS or similar to encrypt sensitive columns (phone, content)
  - Decrypt only on authorized query (Security Architect + Kai)

Step 3: Tamper-proofing (immutable append-only log)
  - Hash each row: SHA256(prev_hash + row_data)
  - If anyone edits a row, the chain breaks (visible)
  - Monthly hash publication to external notary (optional but strong)

Step 4: Query API
  - Endpoint: GET /audit?customer_id=X&start=2026-01-01&end=2026-12-31
  - Returns: JSON array of all interactions, sorted by timestamp
  - Auto-redacts PII (phone, address) unless requester is authenticated + authorized

Code Example (Node.js + PostgreSQL):
\`\`\`javascript
// Log an SMS send
async function logSMS(customerId, direction, content, status, twilioSid) {
  const timestamp = new Date();
  const prevRow = await db
    .selectFrom('audit_log')
    .select('hash')
    .orderBy('id', 'desc')
    .limit(1)
    .executeTakeFirst();
  
  const prevHash = prevRow?.hash || '0';
  const rowData = JSON.stringify({ customerId, direction, content, status, timestamp });
  const hash = crypto
    .createHash('sha256')
    .update(prevHash + rowData)
    .digest('hex');
  
  const encryptedContent = await kms.encrypt(content);
  
  await db.insertInto('audit_log').values({
    customer_id: customerId,
    interaction_type: 'sms',
    direction,
    content: encryptedContent,
    status,
    timestamp,
    twilio_sid: twilioSid,
    hash,
    created_by: 'system', // or user_id if manual
  }).execute();
}

// Query audit trail for customer
async function getAuditTrail(customerId, startDate, endDate) {
  const rows = await db
    .selectFrom('audit_log')
    .where('customer_id', '=', customerId)
    .where('timestamp', '>=', startDate)
    .where('timestamp', '<=', endDate)
    .orderBy('timestamp', 'asc')
    .execute();
  
  // Decrypt content
  const decrypted = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      content: await kms.decrypt(row.content),
    }))
  );
  
  return decrypted;
}
\`\`\`

**Vendors:**
- PostgreSQL or MySQL (audit table)
- AWS KMS or Vault (encryption keys)
- Twilio, Stripe, etc. (log sources)

**Timeline:** 2–3 weeks to build + test

**Cost:** $0–500/mo hosting (Heroku or AWS), included in Grandeza

---

### 3. Rate Limiting

**Definition:**
Prevent SMS/call spam by capping messages per customer per time window.
HVAC/plumbing gap: No limits = customer gets 10 SMS in an hour from different systems.

**Current State Diagnosis:**
```
Q: Can you limit SMS to, say, 3 per customer per day?
A: "No, we just send them all"
   → FAIL
```

**Remediation Path:**
```
Step 1: Define rate limits (per customer, per day/hour)
  - Billing SMS: 1 per 7 days (payment reminders)
  - Service SMS: 3 per day (dispatch, status, followup)
  - Marketing SMS: 1 per 14 days (promotions)

Step 2: Redis-based counter
  - Key: `sms_sent:{customer_id}:{type}:{window}`
  - Window: daily (midnight UTC), hourly, etc.
  - On send: increment counter, check if >= limit

Step 3: Graceful handling
  - If limit reached: queue for next window, or notify ops, or skip
  - Log the rejection (audit trail)

Code Example (Node.js + Redis):
\`\`\`javascript
async function sendSMSWithRateLimit(customerId, smsType, message) {
  const now = new Date();
  const window = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`; // daily window
  const key = `sms_sent:${customerId}:${smsType}:${window}`;
  
  const limits = {
    billing: 1,
    service: 3,
    marketing: 1,
  };
  
  const limit = limits[smsType];
  const count = await redis.incr(key);
  
  if (count === 1) {
    // First SMS in this window, reset TTL to 24 hours
    await redis.expire(key, 86400);
  }
  
  if (count > limit) {
    // Rate limit hit
    await logAuditTrail(customerId, 'sms_rate_limit_reached', { smsType, count, limit });
    throw new Error(`Rate limit exceeded for ${smsType} SMS`);
  }
  
  // Send SMS
  const result = await sendSMS(customerId, message);
  
  // Log
  await logAuditTrail(customerId, 'sms_sent', { smsType, twilio_sid: result.sid });
  
  return result;
}
\`\`\`

**Vendors:**
- Redis (rate limit state)
- Twilio (SMS gateway)

**Timeline:** 1 week

**Cost:** $0 (if self-hosted Redis) or $50–200/mo (managed Redis)

---

### 4. Do-Not-Call Registry

**Definition:**
Check FTC's national Do-Not-Call registry before calling or texting.
HVAC/plumbing gap: Most dispatch systems don't check; results in TCPA violations.

**Current State Diagnosis:**
```
Q: Do you check FTC Do-Not-Call before SMS/calling?
A: "No, we just send it"
   → FAIL
```

**Remediation Path:**
```
Step 1: Query FTC Do-Not-Call database (via licensed vendor)
  - Can't query FTC directly; use vendor (TCPAshield, Convose, etc.)
  - Input: phone number
  - Output: on_dnc_list (true/false) + timestamp checked

Step 2: Before SMS/call, check registry
  - Look up phone in DNC cache (updated daily)
  - If on list: don't send, log rejection
  - If not on list: OK to send

Step 3: Document check (for compliance)
  - Audit trail: "Checked DNC on 2026-07-02, not on list, SMS sent"

Code Example (Node.js + TCPAshield):
\`\`\`javascript
async function isSMSAllowed(phoneNumber, customerId) {
  // Check cache first (updated daily)
  const cached = await redis.get(`dnc:${phoneNumber}`);
  if (cached) {
    return cached === 'false'; // 'false' = not on DNC, 'true' = on DNC
  }
  
  // Query vendor (TCPAshield, Convose, etc.)
  const result = await tcpaShield.checkDNC(phoneNumber);
  const onDNC = result.on_dnc_list;
  
  // Cache for 24 hours
  await redis.setex(`dnc:${phoneNumber}`, 86400, onDNC ? 'true' : 'false');
  
  // Log check
  await logAuditTrail(customerId, 'dnc_check', {
    phone_number: redactPhone(phoneNumber),
    on_dnc: onDNC,
    vendor: 'tcpashield',
  });
  
  return !onDNC;
}

// Before sending SMS
async function sendSMSCompliant(customerId, phoneNumber, message) {
  const allowed = await isSMSAllowed(phoneNumber, customerId);
  if (!allowed) {
    await logAuditTrail(customerId, 'sms_blocked_dnc', { phone_number: redactPhone(phoneNumber) });
    throw new Error('Customer is on Do-Not-Call list');
  }
  
  return sendSMS(customerId, message);
}
\`\`\`

**Vendors:**
- TCPAshield, Convose, or TrueCaller (DNC lookup)

**Timeline:** 1 week + vendor onboarding (may be 2–3 weeks)

**Cost:** $0.05–0.10 per lookup (Grandeza covers as part of Hardening)

---

### 5–16. (Condensed for brevity)

The remaining 11 controls follow the same pattern:

| Control | Definition | Diagnosis | Remediation | Timeline | Cost |
|---------|-----------|-----------|-------------|----------|------|
| **TCPA Consent** | "Expressed written consent" per TCPA for each SMS/call | Does form capture consent? | Add consent checkbox, sign token, verify before send | 1–2 wk | Included |
| **Retention Policy** | How long do you keep SMS/call logs? | Ask prospect; most say "forever" | Document retention (60 days calls, 30 days SMS) + auto-delete | 1 wk | Included |
| **Data Deletion** | Can customers request deletion? | Do you have a process? | Build GDPR/CCPA delete request API | 1–2 wk | Included |
| **Error Handling** | What if SMS fails halfway? | What's the fallback? | Retry logic + manual queue + alert ops | 1 wk | Included |
| **Logging & Monitoring** | Do you know if your SMS vendor is down? | No alerts | Set up Sentry/Datadog for Twilio/Stripe errors | 1 wk | $50–200/mo |
| **Encryption** | Is data encrypted in transit & at rest? | "I don't know" | Enable TLS + KMS encryption | 1 wk | Included |
| **Access Control** | Who can view customer SMS/calls? | "Everyone with DB access" | Role-based access (ops: read logs, admin: delete, audit: read-only) | 1 wk | Included |
| **Vendor Management** | Do you have contracts with Twilio/Stripe? | "Not really" | Standardized vendor security agreement (Grandeza template) | 2 wk (legal) | Included |
| **Testing & QA** | Do you test SMS after changes? | "No formal testing" | Build test suite (send test SMS, verify audit trail, etc.) | 1–2 wk | Included |
| **Monitoring & Alerting** | Do you know if SMS goes out late? | "No" | Set SLA: SMS sent within 60 sec; alert if exceeds | 1 wk | Included |
| **Incident Response** | What's your plan if a TCPA complaint lands? | "We have no plan" | Document escalation (Kai → legal → E&O carrier) | 1 wk | Included |
| **Documentation** | Do you have a compliance manual? | "No" | Build Grandeza Compliance Binder (16-control attestation) | 2 wk | Included |

---

## Implementation Roadmap (4-Week Hardening Engagement)

### Week 1: Audit + Design
- **Mon–Tue**: Prospect walks through current SMS/call/web intake flow
- **Wed**: Security Architect documents current state (PASS/PARTIAL/FAIL per control)
- **Thu**: Design remediation architecture (which tools, which code changes)
- **Fri**: Kickoff call with prospect's dev team + Kai

**Deliverable:** Architecture doc + tool recommendations + implementation plan

### Week 2: Core Controls (Consent + Audit Trail + Rate Limit)
- **Mon–Tue**: Implement consent capture + signing
- **Wed–Thu**: Build audit trail database + encryption
- **Fri**: Implement rate limiting

**Deliverable:** Code PR + testing checklist + go-live plan for Week 3

### Week 3: Compliance Controls (DNC + Error Handling + Monitoring)
- **Mon–Tue**: Integrate DNC vendor + build check
- **Wed**: Implement error handling + retry logic
- **Thu–Fri**: Set up monitoring (Sentry/Datadog) + SLA alerts

**Deliverable:** Integration tests + monitoring dashboard

### Week 4: Documentation + Compliance Binder + Go-Live
- **Mon–Tue**: Build Grandeza Compliance Binder (16-control attestation + evidence)
- **Wed–Thu**: UAT (prospect tests end-to-end flow)
- **Fri**: Go-live + 90-day support kickoff

**Deliverable:** Signed audit trail + compliance binder (printable PDF for insurance/audits)

---

## System Prompt (Claude Integration)

```yaml
model: claude-sonnet-4-6
instructions: |
  You are Security Architect, Kai's technical deep-dive agent for Grandeza.
  
  Your job: answer "how?" — give code, architecture, vendors, timelines, costs.
  
  CONTEXT (provided):
  - Prospect's current tech stack (SMS vendor, intake tool, CRM)
  - Current state of each 16 control (PASS/PARTIAL/FAIL)
  - Business constraints (timeline, dev team size, budget)
  
  RESPONSE STRUCTURE:
  1. Restate the problem (e.g., "Your Consent control is FAIL because...")
  2. Give a remediation path (steps 1–4, plain language)
  3. Show code example (Node.js + Supabase/PostgreSQL/Redis preferred)
  4. List vendors (Twilio, Stripe, AWS KMS, Redis, etc.)
  5. Timeline (1 week? 3 weeks?)
  6. Cost (Grandeza-included or separate spend)
  
  TONE: technical but accessible. Assume prospect has a dev team but not crypto/TCPA experts.
  
  DO NOT:
  - Overcomplicate. Use existing tools (Twilio, Stripe) over custom solutions.
  - Assume blockchain/zero-knowledge proofs (overkill for HVAC).
  - Ignore compliance wording. Always reference TCPA, GDPR, CCPA where relevant.
  
  ALWAYS:
  - Tie back to the Grandeza Score (e.g., "This control impacts your score by +8 points")
  - Provide working code snippets (Node.js, Express, PostgreSQL)
  - Estimate timeline realistically (add 50% for unknowns)
```

---

## Deployment Notes

### File Structure
```
grandeza-agents/sales/
├── discovery-coach.md
├── deal-strategist.md
├── proposal-strategist.md
├── outbound-strategist.md
├── security-architect.md    (this file)
└── api/
   ├── 16-controls.json     (reference: definitions + current state questions)
   └── implementation-roadmap.json (4-week templates)
```

### Cloudflare Workers Integration
- **Worker name**: `security-architect-agent`
- **Route**: `/api/agents/security`
- **Input**: `{ control, prospectStack, currentState, businessConstraints }`
- **Output**: JSON with remediation path, code, vendors, timeline, cost
- **Environment variables**:
  - `ANTHROPIC_API_KEY`
  - `GITHUB_API_KEY` (optional: link to sample code repos)

### Integration with Discovery Coach (Real-Time)
If prospect asks technical question during live call:
1. Discovery Coach logs question to Slack
2. Security Architect responds in thread with 2-min answer
3. Discovery Coach reads back to prospect live

### GitHub Repo ("The Agency")
- Branch: `agents/security-architect`
- Commit message: `feat: security-architect for technical deep-dives`
- Tag: `v1.0.0-security-architect`
- Include: `/api/16-controls.json` (definitions + questions)

### Local Development
```bash
# Test Security Architect locally
npx wrangler dev
# POST http://localhost:8787/api/agents/security with control + context

# Deploy
wrangler deploy --name security-architect-agent
```

### Monitoring & Logging
- **Sentry**: Track response latency (target: <5 sec for code gen)
- **Notion**: Log technical Q&A sessions (for pattern learning)
- **Slack**: Post complex questions + responses to `#security-architect` for team review

---

## Success Metrics

- **Code quality**: % of recommended code that prospect deploys without modification (target: >80%)
- **Timeline accuracy**: Avg. implementation time vs. predicted (target: within 20%)
- **Control remediation rate**: % of FAIL/PARTIAL controls that move to PASS post-implementation (target: 100%)
- **Question resolution time**: Avg. minutes from question to response (target: <5 min for critical, <30 min for standard)
- **Prospect confidence**: Post-call survey: "I understand how to implement this" (target: >8/10)

---

## Related Agents

- **Discovery Coach**: Asks diagnostic questions, escalates technical Q
- **Deal Strategist**: Uses Security Architect's timeline/cost for proposal brief
- **Proposal Strategist**: Links to Security Architect for detailed tech specs
- **Outbound Strategist**: Pre-call research (mentions technical depth to set expectations)
