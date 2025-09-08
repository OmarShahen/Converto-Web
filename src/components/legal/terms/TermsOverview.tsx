export const TermsOverview = () => {
  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <p className="text-sm text-gray-600 mb-2">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        These Terms of Service govern your use of our AI chatbot platform that connects your social media channels (Facebook and Instagram) to provide automated customer support and sales assistance.
      </p>
    </div>
  );
};