"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PaymentDetails } from "@/components/payment/PaymentDetails";
import { PaymentSuccess } from "@/components/payment/PaymentSuccess";
import { PaymentFailed } from "@/components/payment/PaymentFailed";

export default function PaymentResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state: RootState) => state.user.user);

  // Get parameters from URL
  const transactionId = searchParams.get("id") || undefined;
  const order = searchParams.get("order") || undefined;
  const success = searchParams.get("success");
  const pending = searchParams.get("pending");
  const hmac = searchParams.get("hmac");
  const cents = searchParams.get("amount_cents");
  const createdAt = searchParams.get("created_at") || undefined;
  const currency = searchParams.get("currency");

  const isSuccess = success === "true";
  const isPending = pending === "true";

  return (
    <div
      className={`min-h-screen ${
        isSuccess
          ? "bg-gradient-to-br from-green-50 to-blue-50"
          : "bg-gradient-to-br from-red-50 to-orange-50"
      } flex items-center justify-center p-4`}
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Payment Details */}
        <PaymentDetails
          transactionId={transactionId}
          status={isSuccess ? "success" : "failed"}
          isSuccess={isSuccess}
          amount={cents ? (parseInt(cents) / 100).toFixed(2) : undefined}
          currency={currency || "EGP"}
          orderId={order}
          createdAt={createdAt}
        />

        {/* Conditional Content */}
        {isSuccess ? (
          <PaymentSuccess />
        ) : (
          <PaymentFailed error={null} sessionId={transactionId} />
        )}
      </div>
    </div>
  );
}
