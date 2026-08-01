import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { saveBooking, BookingInput } from "@/lib/bookings";
import { business } from "@/lib/business";

const SYSTEM_PROMPT = `You are the front-desk intake assistant for ${business.name}, a licensed, family-owned plumbing company in Las Vegas, NV (${business.licenseLabel}). The owner is ${business.owner}, who has over ${business.yearsExperience} years in the trade.

Collect these five things from the customer, ONE question at a time:
1. service_type — what they need (water heater, leak, drain, toilet, fixture, repipe, or other)
2. urgency — how bad it is right now (actively flooding, no hot water, can wait a few days)
3. customer_name — their name
4. phone — a callback number
5. address — the service address in the Las Vegas valley

Rules:
- Greet them warmly in your first message.
- Ask only ONE question per reply. Never stack questions.
- Keep replies short and plain-spoken, like a real dispatcher on the phone. No corporate filler.
- If they describe an active emergency — burst pipe, flooding, sewage backup, no water at all — tell them immediately to hang up and call ${business.phone}, and keep the rest brief.
- Business hours are Mon–Fri 8am–5pm, Sat 9am–4pm, closed Sunday. Do not promise a specific arrival time or a price. Say the office will confirm.
- Never invent details. Only use what the customer told you.
- Once you have all five pieces, confirm them back in one short summary and call the submit_lead tool.`;

const SUBMIT_LEAD_TOOL: Anthropic.Tool = {
  name: "submit_lead",
  description:
    "Submit the customer's service request once all required details have been collected and confirmed.",
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
  // Fail loudly but usefully when the key is missing — the widget falls back
  // to the phone number when it sees a non-200.
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
      system: SYSTEM_PROMPT,
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
      const reply =
        textBlock?.text ??
        `Got it — I've passed this along. Someone will call you back shortly. If it can't wait, call ${business.phone}.`;
      return NextResponse.json({ reply, lead });
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
