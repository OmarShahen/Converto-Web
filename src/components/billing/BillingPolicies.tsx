import { Zap, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { LegalSection } from "../legal/LegalSection";

export const BillingPolicies = () => {
  return (
    <LegalSection title="Billing Policies & Guidelines">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-[#0d151c] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#607AFB]" />
            Flexible Token Management
          </h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✅ Add tokens anytime with additional purchases</li>
            <li>✅ Multiple subscriptions stack together</li>
            <li>✅ Monitor real-time usage in your dashboard</li>
            <li>✅ Get alerts before running low on tokens</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-semibold text-[#0d151c] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#607AFB]" />
            Fair Usage Policy
          </h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✅ Pay only for what you actually need</li>
            <li>✅ No hidden fees or surprise charges</li>
            <li>✅ Transparent token consumption tracking</li>
            <li>✅ Start with generous free trial</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-semibold text-[#0d151c] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#607AFB]" />
            Subscription Management
          </h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✅ Extend time periods with new purchases</li>
            <li>✅ Immediate activation of new resources</li>
            <li>✅ No waiting periods or approval delays</li>
            <li>✅ Cancel anytime without penalties</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-semibold text-[#0d151c] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#607AFB]" />
            Business Growth Ready
          </h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>✅ Scale resources up instantly as you grow</li>
            <li>✅ No complex upgrade processes</li>
            <li>✅ Mix and match different plan sizes</li>
            <li>✅ Perfect for seasonal business changes</li>
          </ul>
        </div>
      </div>
    </LegalSection>
  );
};