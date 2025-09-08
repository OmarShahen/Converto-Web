import { CheckCircle, Zap } from "lucide-react";

export const BillingOverview = () => {
  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <div className="bg-gradient-to-r from-green-500/10 to-[#607AFB]/10 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0d151c] mb-2">
              Flexible Pay-As-You-Grow Model
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Our billing system is designed for <strong>maximum flexibility</strong>. You can add more tokens and time 
              to your subscription <strong>anytime</strong> - whether your current plan is active or expired.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                ✨ Add tokens anytime
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                📈 Scale as you grow
              </span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                🎯 Pay for what you need
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Free Trial Callout */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0d151c] mb-2">
              🎉 Start with Our Generous Free Trial
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Test our platform risk-free with a substantial token allowance. Experience the full power of our 
              AI chatbot system and see real results before making any financial commitment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};