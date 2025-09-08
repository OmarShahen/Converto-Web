import Link from "next/link";

export const BillingSupport = () => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-[#0d151c] mb-3">
        Still Have Questions?
      </h3>
      <p className="text-gray-700 mb-4">
        Our billing team is here to help clarify any questions about how our subscription model works.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a 
          href="mailto:billing@yourapp.com"
          className="inline-flex items-center justify-center px-4 py-2 bg-[#607AFB] text-white rounded-lg hover:bg-[#4F46E5] transition-colors"
        >
          Contact Billing Support
        </a>
        <Link 
          href="/pricing"
          className="inline-flex items-center justify-center px-4 py-2 border border-[#607AFB] text-[#607AFB] rounded-lg hover:bg-[#607AFB] hover:text-white transition-colors"
        >
          View Pricing Plans
        </Link>
      </div>
    </div>
  );
};