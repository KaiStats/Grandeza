import { business } from "@/lib/business";
import { PhoneIcon } from "./Icons";

/**
 * Sticky mobile call bar. Plumbing emergency traffic skews heavily mobile and
 * the intent is almost always "dial someone now", so the phone number stays
 * within thumb reach the entire scroll. Hidden on md+ where the header CTA is
 * already visible.
 *
 * Pairs with the `pb-20 md:pb-0` spacer below so it never covers footer text.
 */
export default function CallBar() {
  return (
    <>
      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-copper-700 bg-copper-600 px-4 py-3 md:hidden">
        <a
          href={business.phoneHref}
          className="flex items-center justify-center gap-3 rounded-full bg-white py-3.5 text-lg font-bold text-copper-700"
        >
          <PhoneIcon className="h-5 w-5" />
          Call {business.phone}
        </a>
      </div>
    </>
  );
}
