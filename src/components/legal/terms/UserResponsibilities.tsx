import { LegalSection, LegalSubsection, LegalList } from "../LegalSection";

export const UserResponsibilities = () => {
  const accountResponsibilities = [
    "Maintain the security and confidentiality of your account credentials",
    "Provide accurate and up-to-date business information",
    "Comply with all applicable laws and regulations",
    "Ensure your use of the service does not violate social media platform terms"
  ];

  const contentResponsibilities = [
    "Ensure all chatbot responses align with your business policies",
    "Monitor and review AI-generated customer interactions regularly",
    "Provide accurate product information and business policies",
    "Handle sensitive customer data in compliance with privacy laws"
  ];

  const prohibitedUses = [
    "Use the service for illegal activities or spam",
    "Attempt to reverse engineer or copy our technology",
    "Share your account access with unauthorized parties",
    "Use the service to collect or harvest personal data improperly",
    "Violate Facebook or Instagram terms of service",
    "Generate harmful, misleading, or inappropriate content"
  ];

  return (
    <LegalSection title="User Responsibilities and Acceptable Use">
      <LegalSubsection title="Account Responsibilities">
        <LegalList items={accountResponsibilities} />
      </LegalSubsection>

      <LegalSubsection title="Content and Communication">
        <LegalList items={contentResponsibilities} />
      </LegalSubsection>

      <LegalSubsection title="Prohibited Uses">
        <LegalList items={prohibitedUses} />
      </LegalSubsection>
    </LegalSection>
  );
};