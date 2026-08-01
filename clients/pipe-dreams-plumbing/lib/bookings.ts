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
 * In-memory record of leads seen by this server instance. Resets on deploy and
 * is not shared between serverless instances, so treat it as a debugging aid
 * only — it is deliberately NOT the delivery mechanism.
 *
 * Delivery is lib/notify.ts, which pushes each lead out by SMS and/or email the
 * moment it is captured. A lead that only lives in server memory is a lead
 * nobody ever sees.
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
