interface PaymentDetailsProps {
  transactionId?: string;
  sessionId?: string;
  status: "success" | "failed";
  isSuccess: boolean;
  amount?: string;
  currency?: string;
  orderId?: string;
  createdAt?: string;
}

export const PaymentDetails = ({
  transactionId,
  sessionId,
  status,
  isSuccess,
  amount,
  currency,
  orderId,
  createdAt,
}: PaymentDetailsProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="font-semibold text-gray-900 mb-2">
        {isSuccess ? "Payment Details" : "Payment Failed"}
      </h3>
      <div className="space-y-2 text-sm">
        {amount && (
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-gray-900">
              {amount} {currency}
            </span>
          </div>
        )}
        {orderId && (
          <div className="flex justify-between">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-medium text-gray-900 text-xs">{orderId}</span>
          </div>
        )}
        {(transactionId || sessionId) && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              {isSuccess ? "Transaction ID:" : "Session ID:"}
            </span>
            <span className="font-medium text-gray-900 text-xs">
              {transactionId || sessionId}
            </span>
          </div>
        )}
        {createdAt && (
          <div className="flex justify-between">
            <span className="text-gray-600">Created:</span>
            <span className="font-medium text-gray-900 text-xs">
              {new Date(createdAt).toLocaleDateString()}{" "}
              {new Date(createdAt).toLocaleTimeString()}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span
            className={`font-medium ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Success" : "Failed"}
          </span>
        </div>
      </div>
    </div>
  );
};
