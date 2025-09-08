import { CheckCircle, ArrowRight, Home, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600">
          Thank you for subscribing to our service
        </p>
      </div>

      {/* Next Steps */}
      <div className="mb-6 text-left">
        <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Your subscription is now active</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Access to all premium features</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span>Confirmation email sent</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => router.push("/app/dashboard")}
          className="w-full bg-[#607AFB] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#507AFB] transition-colors flex items-center justify-center gap-2"
        >
          <span>Go to Dashboard</span>
          <ArrowRight size={16} />
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/app/subscriptions")}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard size={16} />
            <span>Manage</span>
          </button>

          <button
            onClick={() => router.push("/app/dashboard")}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Support Info */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p>
          Need help? Contact our support team at{" "}
          <a
            href="mailto:support@example.com"
            className="text-[#607AFB] underline"
          >
            support@example.com
          </a>
        </p>
      </div>
    </>
  );
};
