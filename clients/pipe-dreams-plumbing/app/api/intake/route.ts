import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { saveBooking, BookingInput } from "@/lib/bookings";
import { deliverLead, isOpenNow } from "@/lib/notify";
import { business, services, faqs } from "@/lib/business";

/**
 * The assistant's knowledge base is generated from lib/business.ts rather than
 * written out by hand, so correcting a service or an FAQ on the website also
 * corrects what the receptionist tells people. Hand-written duplicates drift.
 */
function knowledgeBase(): string {
  const serviceList = services
    .map((s) => `- ${s.title}: ${s.blurb} (${s.points.join(", ")})`)
    .join("\n");

  const faqList = faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");

  const hours = business.hours.map((h) => `${h.days}: ${h.time}`).join("; ");

  return `## What ${business.name} does
${serviceList}

If someone asks about work not on this list, say it's likely something we handle but they should call ${business.phone} to confirm — do not guess yes or no.

## Service area
${business.serviceArea.join(", ")}. Based in Summerlin. If someone names a place not on this list, tell them to call and ask rather than guessing.

## Hours
${hours}.

## Common questions
${faqList}

## Facts you may state
- Licensed and insured, ${business.licenseLabel}
- Owner is ${business.owner}, a Las Vegas native with ${business.yearsExperience}+ years in the trade
- Family owned

## Never state
- Specific prices, price ranges, or "free estimate" — pricing is quoted by ${business.owner} only
- A specific arrival time or appointment slot — the office confirms scheduling
- Warranty terms, guarantees, review counts, or ratings
- Anything about the business not listed above. If you do not know, say so and give the phone number.`;
}

function systemPrompt(): string {
  const open = isOpenNow();

  return `You are the after-hours receptionist for ${business.name}, a licensed family-owned plumbing company in Las Vegas, NV.

${business.owner} is usually on a job and can't get to the phone, which is why you exist. Your job is to do what a good receptionist does: answer what you can, and take a complete message so he can call back.

The shop is currently ${open ? "OPEN" : "CLOSED"}.

# How to behave
- Greet them warmly, once, in your first message.
- Answer questions directly from the knowledge base below. That is a real part of this job — don't rush someone into the intake questions when they asked something simple.
- When they need work done, collect these five things, ONE question per reply, never stacked:
  1. what's wrong (water heater, leak, drain, toilet, fixture, repipe, or other)
  2. how urgent it is right now
  3. their name
  4. a callback number
  5. the service address
- Keep replies short and plain-spoken, the way a person actually talks on the phone. No corporate filler, no bullet lists at the customer.
- If they've already told you something, don't ask again.
- Once you have all five, read them back in one short summary and call the submit_lead tool.

# Emergencies override everything
If they describe active flooding, a burst pipe, sewage backing up, or no water at all, stop the intake immediately and tell them to call ${business.phone} right now. ${open ? "Someone can pick up." : "It rings through to the on-call line."} Take a message only if they say they'd rather not call.

# Honesty
Never invent a price, a time, or a fact. If you don't know, say you don't know and give them ${business.phone}. Guessing wrong costs this business a customer.

${knowledgeBase()}`;
}

const SUBMIT_LEAD_TOOL: Anthropic.Tool = {
  name: "submit_lead",
  description:
    "Submit the customer's service request once all required details have been collected and read back to them.",
  input_schema: {
    type: "object" as const,
    properties: {
      customer_name: { type: "string", description: "Full name of the customer" },
      phone: { type: "string", description: "Customer callback phone number" },
      service_type: {
        type: "string",
        enum: ["water heater", "leak", "drain", "toilet", "fixture", "repipe", "other"],
        description: "Type of plumbing work requested",
      },
      urgency: {
        type: "string",
        description: "How urgent the issue is, in the customer's own words",
      },
      address: { type: "string", description: "Service address" },
      notes: {
        type: "string",
        description: "Any extra detail about the problem (optional)",
      },
    },
    required: ["customer_name", "phone", "service_type", "urgency", "address"],
  },
};

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Intake is not configured", detail: "ANTHROPIC_API_KEY is not set" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const messages: Anthropic.MessageParam[] = body.messages ?? [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Bad request", detail: "messages must be a non-empty array" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: systemPrompt(),
      tools: [SUBMIT_LEAD_TOOL],
      messages,
    });

    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );

    const toolUseBlock = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (toolUseBlock?.name === "submit_lead") {
      const lead = await saveBooking(toolUseBlock.input as BookingInput);
      const delivery = await deliverLead(lead);

      // Never tell someone their message got through when it didn't — that is
      // strictly worse than telling them to call, because they stop trying.
      const reply = delivery.delivered
        ? textBlock?.text ??
          `Got it — I've sent this over to ${business.owner} and he'll call you back.`
        : `I have your details, but I can't confirm the message reached ${business.owner}. Please call ${business.phone} to be safe.`;

      return NextResponse.json({
        reply,
        delivered: delivery.delivered,
        lead: { id: lead.id },
      });
    }

    if (!textBlock) {
      return NextResponse.json(
        { error: "No text content in model response" },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: textBlock.text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[intake] failed:", message);
    return NextResponse.json(
      { error: "Intake request failed", detail: message },
      { status: 500 }
    );
  }
}
