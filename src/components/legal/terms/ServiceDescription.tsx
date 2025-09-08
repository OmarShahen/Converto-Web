import { LegalSection, LegalList, LegalParagraph } from "../LegalSection";

export const ServiceDescription = () => {
  const serviceFeatures = [
    "AI-powered chatbot creation and management",
    "Integration with Facebook and Instagram messaging platforms",
    "Automated customer support and sales assistance",
    "Analytics and reporting tools",
    "Customer conversation management",
    "Token-based usage system"
  ];

  return (
    <LegalSection title="Service Description">
      <LegalParagraph>
        Our platform provides AI-powered chatbot services designed specifically for social media commerce. Our services include:
      </LegalParagraph>
      
      <LegalList items={serviceFeatures} />
      
      <LegalParagraph>
        By using our services, you acknowledge that AI responses are generated automatically and may require human oversight for complex customer interactions.
      </LegalParagraph>
    </LegalSection>
  );
};