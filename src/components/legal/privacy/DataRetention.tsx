import { LegalSection, LegalList, LegalParagraph } from "../LegalSection";

export const DataRetention = () => {
  const retentionPeriods = [
    "Account information: Until you delete your account",
    "Conversation data: 12 months for analytics and improvement",
    "Usage logs: 6 months for security and debugging",
    "Deleted data is permanently removed within 30 days"
  ];

  return (
    <LegalSection title="Data Retention">
      <LegalParagraph>
        We retain your information for as long as necessary to provide our services:
      </LegalParagraph>
      
      <LegalList items={retentionPeriods} />
    </LegalSection>
  );
};