import { Clock, Zap, CheckCircle } from "lucide-react";

export const BillingLimits = () => {
  return (
    <div className="mb-8">
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#0d151c]">Time Limit</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Every plan has a specific duration (e.g., 30 days, 7 days).
          </p>
          <div className="text-sm text-gray-600">
            <p>• Plan starts when payment is confirmed</p>
            <p>• Expires automatically at end date</p>
            <p>• Cannot be extended mid-cycle</p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[#0d151c]">Token Limit</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Each plan includes a specific number of AI tokens.
          </p>
          <div className="text-sm text-gray-600">
            <p>• Tokens are consumed with each AI interaction</p>
            <p>• Subscription expires when tokens reach zero</p>
            <p>• No token rollover between billing cycles</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#607AFB] to-purple-600 rounded-lg p-6 text-white mb-8">
        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Key Advantage: Add More Resources Anytime
        </h4>
        <p className="text-gray-100 mb-4">
          Running low on tokens or time? No problem! Purchase additional subscriptions that automatically add to your current totals - even if your plan is still active.
        </p>
        <div className="bg-white/20 rounded-lg p-3">
          <p className="text-sm font-medium">
            💡 <strong>Pro Tip:</strong> Your new subscription tokens and time are added to your existing balance, giving you complete control over your usage.
          </p>
        </div>
      </div>
    </div>
  );
};