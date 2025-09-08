import { CheckCircle, Zap, Clock, AlertCircle } from "lucide-react";
import { LegalSection } from "../legal/LegalSection";

export const BillingFAQ = () => {
  return (
    <LegalSection title="Frequently Asked Questions">
      <div className="space-y-6">
        <div className="border-l-4 border-green-500 pl-6 bg-green-50 p-4 rounded-r-lg">
          <h4 className="font-semibold text-[#0d151c] mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Can I add more tokens if I'm running low?
          </h4>
          <p className="text-gray-700">
            <strong>Yes, absolutely!</strong> You can purchase additional plans anytime - even while your current subscription is active. New tokens are added to your existing balance immediately.
          </p>
        </div>

        <div className="border-l-4 border-blue-500 pl-6 bg-blue-50 p-4 rounded-r-lg">
          <h4 className="font-semibold text-[#0d151c] mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            How does the free trial work?
          </h4>
          <p className="text-gray-700">
            Our free trial includes a generous token allowance so you can fully test our AI chatbot system. Experience real conversations with your customers and see actual results before committing to a paid plan.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6 bg-purple-50 p-4 rounded-r-lg">
          <h4 className="font-semibold text-[#0d151c] mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            What happens if my subscription expires?
          </h4>
          <p className="text-gray-700">
            No problem! You can purchase a new plan immediately after expiration. Your service resumes instantly with fresh tokens and time. There's no waiting period or reactivation process.
          </p>
        </div>

        <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 p-4 rounded-r-lg">
          <h4 className="font-semibold text-[#0d151c] mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            Can I buy multiple plans at once?
          </h4>
          <p className="text-gray-700">
            Yes! You can purchase multiple plans and they all stack together. For example, buy 3 monthly plans to get 3 months of service with 3x the tokens. Perfect for planning ahead or handling busy seasons.
          </p>
        </div>

        <div className="border-l-4 border-[#607AFB] pl-6">
          <h4 className="font-semibold text-[#0d151c] mb-2">
            How can I monitor my token usage?
          </h4>
          <p className="text-gray-700">
            Your dashboard shows real-time token consumption and remaining balance. You'll also receive notifications when you're running low, giving you time to add more tokens before running out.
          </p>
        </div>
      </div>
    </LegalSection>
  );
};