import { LegalSection, LegalParagraph } from "../LegalSection";

export const ContactInfo = () => {
  return (
    <LegalSection title="Contact Us">
      <LegalParagraph>
        If you have any questions about this Privacy Policy or our data practices, please contact us:
      </LegalParagraph>

      <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
        <p className="mb-2"><strong>Email:</strong> privacy@yourapp.com</p>
        <p className="mb-2"><strong>Address:</strong> [Your Business Address]</p>
        <p><strong>Response Time:</strong> We aim to respond to all privacy inquiries within 30 days</p>
      </div>
    </LegalSection>
  );
};