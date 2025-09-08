import { CheckCircle, XCircle } from "lucide-react";
import { LegalSection } from "../legal/LegalSection";

export const BillingComparison = () => {
  return (
    <LegalSection title="Why Our Billing System is Better">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h4 className="text-lg font-semibold text-[#0d151c]">Our System</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✅ Add tokens anytime during active subscription</li>
            <li>✅ Purchase multiple plans that stack together</li>
            <li>✅ Immediate activation of new resources</li>
            <li>✅ Scale up or down based on real needs</li>
            <li>✅ No waiting periods or restrictions</li>
            <li>✅ Generous free trial to test everything</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
            <h4 className="text-lg font-semibold text-[#0d151c]">Typical SaaS Billing</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>❌ Must wait until next billing cycle to upgrade</li>
            <li>❌ Fixed monthly limits with no flexibility</li>
            <li>❌ Pro-rated charges and complex calculations</li>
            <li>❌ Limited or no free trial</li>
            <li>❌ Overpay for unused features</li>
            <li>❌ Locked into annual contracts</li>
          </ul>
        </div>
      </div>
    </LegalSection>
  );
};