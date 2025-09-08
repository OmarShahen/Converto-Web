import { LegalSection, LegalSubsection, LegalList, LegalParagraph } from "../LegalSection";

export const InformationSharing = () => {
  const serviceProviderItems = [
    "Third-party services that help us operate our platform (hosting, analytics, payment processing)",
    "AI and machine learning providers that power our chatbot technology",
    "Customer support tools and communication platforms"
  ];

  const socialMediaItems = [
    "Facebook and Instagram APIs to send and receive messages",
    "Data shared is limited to what's necessary for chatbot functionality",
    "We comply with each platform's privacy policies and terms of service"
  ];

  const legalRequirementItems = [
    "When required by law or legal process",
    "To protect our rights, property, or safety",
    "To prevent fraud or security threats"
  ];

  return (
    <LegalSection title="Information Sharing">
      <LegalParagraph>
        We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:
      </LegalParagraph>

      <LegalSubsection title="Service Providers">
        <LegalList items={serviceProviderItems} />
      </LegalSubsection>

      <LegalSubsection title="Social Media Platforms">
        <LegalList items={socialMediaItems} />
      </LegalSubsection>

      <LegalSubsection title="Legal Requirements">
        <LegalList items={legalRequirementItems} />
      </LegalSubsection>
    </LegalSection>
  );
};