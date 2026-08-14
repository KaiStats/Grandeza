> ⚠️ **DRAFT — NOT FOR CLIENT DELIVERY.** This is a working draft prepared to close the gap
> identified in Control 11 (Vendor Contracts / DPA) of the Grandeza Standard: Grandeza has no
> Data Processing Addendum to give its own tenants. It has **not** been reviewed by counsel.
> Do not send this to a prospect, attach it to a proposal, or reference it as executed until a
> licensed attorney (ideally the TCPA/privacy counsel from the defense-firm shortlist) has
> reviewed it — particularly the liability cap, indemnification, and breach-notification
> sections, which carry real exposure if drafted wrong. Treat every bracketed field as
> unresolved.

---

# Data Processing Addendum

**Between:** Grandeza LLC ("**Grandeza**," "**Processor**")
**And:** [Customer legal name] ("**Customer**," "**Controller**")

Effective as of the date of the last signature below (the "**DPA Effective Date**"), and
incorporated into and made part of the Master Services Agreement / Order Form between the
parties dated [_______] (the "**Agreement**").

## 1. Background

1.1. Customer uses Grandeza's Protected Intake service to receive, screen, and respond to
inbound and outbound communications (SMS, voice, and/or web chat) with Customer's leads and
customers ("**Contacts**") on Customer's behalf.

1.2. In providing Protected Intake, Grandeza acts as a processor / service provider of Personal
Data that Customer controls. This DPA sets the terms under which Grandeza processes that
Personal Data, and is the DPA referenced in Control 11 of the Grandeza Standard.

1.3. This DPA applies to the extent Grandeza processes Personal Data on Customer's behalf in
connection with the Agreement. It does not itself grant any rights or impose any obligations not
otherwise required by Applicable Data Protection Law.

## 2. Definitions

- "**Applicable Data Protection Law**" means all data protection and privacy laws applicable to
  the processing of Personal Data under this DPA, including the Nevada Security and Privacy of
  Personal Information Act (NRS Chapter 603A), the Nevada law on the sale of covered information
  (NRS 603A.300–360), the Telephone Consumer Protection Act (47 U.S.C. § 227) and its
  implementing FCC regulations as applied to Customer's use of the Services, and, to the extent
  applicable to a given Customer's Contacts, the CCPA/CPRA and comparable state privacy statutes.
- "**Personal Data**" means information relating to an identified or identifiable natural person
  that Grandeza processes on Customer's behalf under the Agreement — at minimum: Contact name,
  phone number, email address, service address, consent records and timestamps, and the content
  of inbound/outbound messages and call transcripts.
- "**Process**" / "**Processing**" means any operation performed on Personal Data, including
  collection, storage, transmission, and deletion.
- "**Sub-processor**" means any third party Grandeza engages to process Personal Data on
  Customer's behalf in delivering the Services, as listed in Exhibit A.
- "**Security Incident**" means a confirmed unauthorized access to, acquisition of, or disclosure
  of Personal Data processed under this DPA.

## 3. Roles of the Parties

Customer is the Controller (or "business"/"data collector," under the terminology of Applicable
Data Protection Law) with respect to Personal Data of its Contacts. Grandeza is the Processor
(or "service provider"/"processor"), acting only on Customer's documented instructions as set
out in the Agreement, this DPA, and Customer's configuration of the Services.

## 4. Subject Matter and Details of Processing

| | |
|---|---|
| **Subject matter** | Provision of the Protected Intake service (AI-assisted SMS/voice/chat intake, consent capture, opt-out handling, and audit logging) |
| **Duration** | For the term of the Agreement, plus the retention period in Section 9 |
| **Nature and purpose** | Receiving, routing, and responding to Contact communications on Customer's behalf; recording consent and opt-out status; producing an auditable record of the interaction |
| **Categories of data subjects** | Customer's leads, customers, and other individuals who contact Customer or whom Customer contacts through the Services |
| **Categories of Personal Data** | Name, phone number, email, service/property address, message and call content, consent and opt-out status and timestamps, and metadata Customer configures the Services to capture |
| **Special categories of data** | None expected. Customer shall not route special-category data (health, financial account numbers, government ID numbers, etc.) through the Services without Grandeza's prior written agreement on additional safeguards. |

## 5. Grandeza's Obligations

5.1. **Instructions.** Grandeza will process Personal Data only on Customer's documented
instructions (the Agreement, this DPA, and Customer's Service configuration), unless required to
do otherwise by law, in which case Grandeza will notify Customer first unless legally prohibited.

5.2. **Confidentiality.** Grandeza will ensure personnel authorized to process Personal Data are
subject to confidentiality obligations.

5.3. **Security measures.** Grandeza will implement and maintain technical and organizational
measures appropriate to the risk, including: encryption of Personal Data in transit and at rest;
role-based access controls; append-only, hash-chained audit logging of consent, opt-out, and
message events (see Controls 13–16 of the Grandeza Standard); and periodic access review.
[Attach or link a security overview / SOC-2-in-progress statement once available — do not
represent a certification Grandeza does not hold.]

5.4. **Sub-processors.** Grandeza may engage the Sub-processors listed in Exhibit A to provide
the Services. Grandeza will give Customer at least [15] days' notice before adding a new
Sub-processor that will process Customer's Personal Data (via email or an update to a published
sub-processor list), during which Customer may object on reasonable data-protection grounds. If
the parties cannot resolve the objection, Customer may terminate the affected Service without
penalty. Grandeza remains liable for each Sub-processor's performance under terms materially as
protective as this DPA.

5.5. **Assistance.** Grandeza will provide reasonable assistance to help Customer respond to
verified data subject requests (access, deletion, correction) and to opt-out/STOP requests,
consistent with the Services' built-in opt-out handling.

5.6. **Security Incident notification.** Grandeza will notify Customer without unreasonable delay,
and in no event later than [72] hours, after becoming aware of a Security Incident affecting
Customer's Personal Data, and will provide the information reasonably available to Grandeza to
help Customer meet its own notification obligations under NRS 603A.220 and other Applicable Data
Protection Law. [Confirm this interval against counsel's read of NRS 603A — the statute itself
sets no fixed deadline ("most expedient time possible," no unreasonable delay); a contractual
72-hour trigger is a Grandeza-side commitment layered on top, not a restatement of the statute.]

5.7. **Deletion or return.** On termination of the Agreement, and subject to Section 9, Grandeza
will delete or return Customer's Personal Data within [30] days of Customer's written request,
except where retention is required by law.

5.8. **Audit.** No more than once per 12-month period (or following a Security Incident),
Customer may request evidence of Grandeza's compliance with this DPA, which Grandeza will
provide via documentation review and, if that is insufficient, a mutually scheduled audit at
Customer's expense, subject to confidentiality.

5.9. **Records export.** On request, Grandeza will produce, within a commercially reasonable
time, a chain-verified export of the consent records, timestamps, opt-out logs, and message
history in scope for the Contacts Customer identifies — the same export capability tracked under
Controls 13–16 of the Grandeza Standard. [This clause should not go final until that export path
actually exists — see item A7 in the engineering backlog. Don't hand this DPA to a real tenant
promising a capability that isn't built yet.]

## 6. Customer's Obligations

6.1. Customer is responsible for the accuracy, quality, and legality of the Personal Data it
provides or directs Grandeza to collect, and for having a lawful basis (including TCPA consent
that is directly captured for Customer, not imported from a third-party list without
verifiable, Customer-specific consent — see Control 03) for the communications it directs the
Services to send.

6.2. Customer will not instruct Grandeza to process Personal Data in a way that would violate
Applicable Data Protection Law.

## 7. Sub-processors — see Exhibit A

## 8. International Transfers

Not applicable at this time — Grandeza's current Sub-processors process and store Customer's
Personal Data within the United States. [Confirm and re-flag if any current or future
Sub-processor stores data outside the U.S.]

## 9. Data Retention

Personal Data is retained per the retention schedule configured under Customer's account and
Control 04 (Data Minimization) of the Grandeza Standard. [This DPA should not be finalized ahead
of that retention policy actually existing — see item A6 in the engineering backlog.]

## 10. Liability

Each party's liability under this DPA is subject to the limitations and exclusions of liability
in the Agreement. [This is the section most likely to need real negotiation/counsel drafting —
do not let a generic clause stand in for it.]

## 11. Term and Governing Law

This DPA remains in effect for as long as Grandeza processes Personal Data on Customer's behalf
under the Agreement. It is governed by the laws of the State of Nevada, consistent with the
Agreement's governing-law clause. [Confirm the Agreement's governing law matches before this
DPA is finalized.]

---

**Grandeza LLC**
By: _______________________
Name: Kai [Last name]
Title: Founder
Date: _______________________

**[Customer legal name]**
By: _______________________
Name: _______________________
Title: _______________________
Date: _______________________

---

## Exhibit A — Sub-processors

| Sub-processor | Function | Data processed | Sub-processor's DPA |
|---|---|---|---|
| Twilio Inc. | SMS/voice delivery and receipt | Phone numbers, message/call content, delivery metadata | Incorporated via Twilio's standard Terms of Service / DPA — [confirm and cite the specific version/URL and date accepted] |
| Anthropic PBC | AI model inference for intake conversation handling | Message content submitted for a response | Incorporated via Anthropic's Commercial Terms of Service / DPA — [confirm and cite the specific version/URL and date accepted] |
| Supabase, Inc. | Database / data storage | All Personal Data at rest | Incorporated via Supabase's DPA — [confirm and cite the specific version/URL and date accepted] |
| Vercel Inc. | Application hosting | Data in transit through the hosted application | Incorporated via Vercel's DPA — [confirm and cite the specific version/URL and date accepted] |

Per item C1 in the engineering/legal backlog: each of these four sub-processor DPAs was verified
Aug 8 as auto-incorporated by accepting the vendor's standard terms — no separate negotiation
needed. What's still open is capturing the exact URLs/versions/sub-processor pages in the
corporate records binder, which this table is a placeholder for, not a substitute.
