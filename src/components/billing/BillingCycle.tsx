import { LegalSection } from "../legal/LegalSection";

export const BillingCycle = () => {
  return (
    <LegalSection title="Payment & Billing Cycle">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-[#0d151c] mb-4">When You Subscribe:</h4>
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#607AFB] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
            <p>You select a plan and make payment upfront</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#607AFB] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
            <p>Your subscription activates immediately with full token allocation</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#607AFB] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
            <p>Both time countdown and token consumption begin</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#607AFB] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">4</div>
            <p>Subscription expires when either limit is reached first</p>
          </div>
        </div>
      </div>
    </LegalSection>
  );
};