export interface BookingInput {
  customer_name: string;
  phone: string;
  service_type:
    | "water heater"
    | "leak"
    | "drain"
    | "toilet"
    | "fixture"
    | "repipe"
    | "other";
  urgency: string;
  address: string;
  notes?: string;
}

export interface Booking extends BookingInput {
  id: string;
  created_at: string;
  status: "new";
}

/**
 * ⚠️  In-memory store — resets on every deploy and is NOT shared between
 * serverless instances. It exists so the intake flow is testable end to end.
 *
 * Before launch, replace `saveBooking` with something durable. The cheapest
 * option that actually works for a shop this size is to skip the database
 * entirely and forward each lead straight to the owner:
 *   - SMS via Twilio to business.phone, or
 *   - email via Resend to the office inbox.
 * A lead that only lives in server memory is a lead nobody ever sees.
 */
const bookings: Booking[] = [];

export async function saveBooking(input: BookingInput): Promise<Booking> {
  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "new",
  };

  bookings.push(booking);
  console.log("[intake] new lead:", booking);

  return booking;
}

export function getAllBookings(): Booking[] {
  return [...bookings];
}
