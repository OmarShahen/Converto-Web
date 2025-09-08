import { LegalSection, LegalSubsection, LegalList, LegalParagraph } from "../LegalSection";

export const TerminationPolicy = () => {
  const terminationReasons = [
    "Violation of these Terms of Service",
    "Fraudulent or illegal use of the service",
    "Non-payment of fees",
    "Abuse of our platform or staff",
    "Violation of social media platform terms of service"
  ];

  const userTermination = [
    "You may cancel your subscription at any time through your account settings",
    "Service will continue until your current subscription expires",
    "No refunds will be provided for early termination",
    "You can download your data before termination"
  ];

  const dataRetention = [
    "Account data will be retained for 30 days after termination",
    "Conversation data will be permanently deleted after 90 days",
    "You can request immediate data deletion upon termination",
    "Some data may be retained for legal and compliance purposes"
  ];

  return (
    <LegalSection title="Termination and Account Closure">
      <LegalSubsection title="Termination by Us">
        <LegalParagraph>
          We reserve the right to suspend or terminate your account for any of the following reasons:
        </LegalParagraph>
        <LegalList items={terminationReasons} />
      </LegalSubsection>

      <LegalSubsection title="Termination by You">
        <LegalList items={userTermination} />
      </LegalSubsection>

      <LegalSubsection title="Data After Termination">
        <LegalList items={dataRetention} />
      </LegalSubsection>
    </LegalSection>
  );
};