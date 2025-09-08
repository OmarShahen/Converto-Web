import { LegalSection, LegalSubsection, LegalList } from "../LegalSection";

export const InformationUsage = () => {
  const serviceProvisionItems = [
    "Operate and maintain your AI chatbot",
    "Process customer messages and generate automated responses",
    "Provide customer support and sales assistance through your social media channels",
    "Analyze conversation patterns to improve chatbot performance"
  ];

  const accountManagementItems = [
    "Create and maintain your account",
    "Process payments and manage subscriptions",
    "Provide technical support and customer service",
    "Send important account notifications and updates"
  ];

  const improvementItems = [
    "Analyze usage patterns to improve our platform",
    "Develop new features and functionality",
    "Generate insights and reports for your business",
    "Ensure platform security and prevent fraud"
  ];

  return (
    <LegalSection title="How We Use Your Information">
      <LegalSubsection title="Service Provision">
        <LegalList items={serviceProvisionItems} />
      </LegalSubsection>

      <LegalSubsection title="Account Management">
        <LegalList items={accountManagementItems} />
      </LegalSubsection>

      <LegalSubsection title="Improvement and Analytics">
        <LegalList items={improvementItems} />
      </LegalSubsection>
    </LegalSection>
  );
};