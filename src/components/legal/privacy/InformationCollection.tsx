import { LegalSection, LegalSubsection, LegalList } from "../LegalSection";

export const InformationCollection = () => {
  const personalInfoItems = [
    "Account information (name, email address, phone number)",
    "Business information (store name, business type, location)",
    "Payment information (processed securely through third-party providers)",
    "Profile information and preferences"
  ];

  const socialMediaItems = [
    "Facebook and Instagram page information you connect to our service",
    "Customer messages and conversations from your connected social media channels",
    "Page insights and analytics data",
    "Customer interaction history and preferences"
  ];

  const usageInfoItems = [
    "How you use our platform and features",
    "Chatbot performance and conversation analytics",
    "Device information and browser type",
    "IP address and location data"
  ];

  return (
    <LegalSection title="Information We Collect">
      <LegalSubsection title="Personal Information">
        <LegalList items={personalInfoItems} />
      </LegalSubsection>

      <LegalSubsection title="Social Media Data">
        <LegalList items={socialMediaItems} />
      </LegalSubsection>

      <LegalSubsection title="Usage Information">
        <LegalList items={usageInfoItems} />
      </LegalSubsection>
    </LegalSection>
  );
};