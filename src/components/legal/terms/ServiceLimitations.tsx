import { LegalSection, LegalSubsection, LegalList, LegalParagraph } from "../LegalSection";

export const ServiceLimitations = () => {
  const serviceAvailability = [
    "We strive for 99.9% uptime but do not guarantee uninterrupted service",
    "Planned maintenance may temporarily affect service availability",
    "Third-party platform outages (Facebook, Instagram) may impact functionality",
    "We will provide reasonable notice for scheduled maintenance when possible"
  ];

  const aiLimitations = [
    "AI responses are generated automatically and may not always be perfect",
    "Complex customer issues may require human intervention",
    "AI training and improvements are ongoing processes",
    "Response accuracy depends on the quality of your business information provided"
  ];

  const liabilityLimitations = [
    "Our total liability shall not exceed the amount paid for services in the last 12 months",
    "We are not liable for indirect, incidental, or consequential damages",
    "You are responsible for monitoring and approving AI-generated customer interactions",
    "We do not guarantee specific business outcomes or revenue increases"
  ];

  return (
    <LegalSection title="Service Limitations and Disclaimers">
      <LegalSubsection title="Service Availability">
        <LegalList items={serviceAvailability} />
      </LegalSubsection>

      <LegalSubsection title="AI Technology Limitations">
        <LegalParagraph>
          While our AI technology is sophisticated, it has inherent limitations:
        </LegalParagraph>
        <LegalList items={aiLimitations} />
      </LegalSubsection>

      <LegalSubsection title="Limitation of Liability">
        <LegalList items={liabilityLimitations} />
      </LegalSubsection>
    </LegalSection>
  );
};