export const PrivacyOverview = () => {
  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <p className="text-sm text-gray-600 mb-2">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        This Privacy Policy describes how we collect, use, and protect your information when you use our AI chatbot platform that connects your social media channels (Facebook and Instagram) to provide automated customer support and sales assistance.
      </p>
    </div>
  );
};