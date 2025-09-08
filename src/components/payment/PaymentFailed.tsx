import {
  XCircle,
  ArrowLeft,
  RefreshCw,
  Home,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaymentFailedProps {
  error: string | null;
  planId?: string;
  sessionId?: string;
}

export const PaymentFailed = ({
  error,
  planId,
  sessionId,
}: PaymentFailedProps) => {
  const router = useRouter();
  const [retrying, setRetrying] = useState(false);

  const getErrorMessage = (error: string | null) => {
    const errorMessages: any = {
      card_declined:
        "Your card was declined. Please try a different payment method.",
      insufficient_funds:
        "Insufficient funds. Please check your account balance.",
      expired_card: "Your card has expired. Please use a different card.",
      invalid_cvc: "Invalid security code. Please check your CVC.",
      processing_error: "There was an error processing your payment.",
      cancelled: "Payment was cancelled.",
      timeout: "Payment timed out. Please try again.",
    };
    return (
      errorMessages[error || ""] ||
      "Your payment could not be processed. Please try again."
    );
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <XCircle size={32} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600">{getErrorMessage(error)}</p>
      </div>

      {/* Common Solutions */}
      <div className="mb-6 text-left">
        <h3 className="font-semibold text-gray-900 mb-3">Common Solutions:</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Check that your card details are correct</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Ensure you have sufficient funds</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Try a different payment method</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Contact your bank if the issue persists</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => router.push("/pricing")}
          disabled={retrying}
          className="w-full bg-[#607AFB] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#507AFB] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={retrying ? "animate-spin" : ""} />
          <span>{retrying ? "Redirecting..." : "Try Again"}</span>
        </button>

        <button
          onClick={() => router.push("/pricing")}
          className="w-full border border-[#607AFB] text-[#607AFB] py-3 px-4 rounded-lg font-medium hover:bg-[#607AFB] hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Choose Different Plan</span>
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/app/dashboard")}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={16} />
            <span>Home</span>
          </button>

          <button
            onClick={() => window.open("mailto:support@example.com", "_blank")}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            <span>Support</span>
          </button>
        </div>
      </div>

      {/* Support Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3 mb-3">
          <p className="text-xs text-blue-800 font-medium">
            💡 Still having trouble? We're here to help!
          </p>
        </div>
        <p className="text-xs text-gray-500">
          Contact our support team at{" "}
          <a
            href="mailto:support@example.com"
            className="text-[#607AFB] underline"
          >
            support@example.com
          </a>{" "}
          or call us at{" "}
          <a href="tel:+1234567890" className="text-[#607AFB] underline">
            (20) 1065630331
          </a>
        </p>
      </div>
    </>
  );
};
