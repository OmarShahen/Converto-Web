import { LegalSection, LegalSubsection, LegalList } from "../LegalSection";

export const UserRights = () => {
  const accessControlItems = [
    "Access and update your personal information",
    "Download your data in a portable format",
    "Delete your account and associated data",
    "Opt-out of non-essential communications"
  ];

  const socialMediaPermissions = [
    "Disconnect social media accounts at any time",
    "Control which pages and data we can access",
    "Manage permissions through your social media platform settings"
  ];

  return (
    <LegalSection title="Your Rights and Choices">
      <LegalSubsection title="Access and Control">
        <LegalList items={accessControlItems} />
      </LegalSubsection>

      <LegalSubsection title="Social Media Permissions">
        <LegalList items={socialMediaPermissions} />
      </LegalSubsection>
    </LegalSection>
  );
};