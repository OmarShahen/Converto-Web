import { LegalSection, LegalParagraph } from "../LegalSection";

export const TermsContact = () => {
  return (
    <LegalSection title="Contact Information">
      <LegalParagraph>
        If you have any questions about these Terms of Service, please contact us:
      </LegalParagraph>

      <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
        <p className="mb-2"><strong>Email:</strong> legal@yourapp.com</p>
        <p className="mb-2"><strong>Support:</strong> support@yourapp.com</p>
        <p className="mb-2"><strong>Address:</strong> [Your Business Address]</p>
        <p><strong>Response Time:</strong> We aim to respond to all legal inquiries within 5 business days</p>
      </div>
    </LegalSection>
  );
};