import { LegalSection, LegalSubsection, LegalList, LegalParagraph } from "../LegalSection";

export const PaymentTerms = () => {
  const billingPolicies = [
    "All payments are processed upfront before service activation",
    "Subscription tokens and time periods are added to your existing balance",
    "You can purchase additional subscriptions anytime to extend your service",
    "Subscriptions expire when either time limit or token limit is reached first",
    "No partial refunds for unused tokens or remaining time periods"
  ];

  const paymentMethods = [
    "Credit and debit cards (Visa, Mastercard, American Express)",
    "Digital payment platforms as available in your region",
    "All payments are processed securely through third-party providers",
    "Payment information is not stored on our servers"
  ];

  return (
    <LegalSection title="Payment Terms and Billing">
      <LegalSubsection title="Billing Policy">
        <LegalParagraph>
          Our flexible pay-as-you-grow billing system allows you to add resources anytime. Key billing terms:
        </LegalParagraph>
        <LegalList items={billingPolicies} />
      </LegalSubsection>

      <LegalSubsection title="Payment Methods">
        <LegalList items={paymentMethods} />
      </LegalSubsection>

      <LegalSubsection title="Refunds and Cancellations">
        <LegalParagraph>
          All sales are final. You may cancel your subscription at any time, but no refunds will be provided for unused tokens or time. Service will continue until your current subscription expires.
        </LegalParagraph>
      </LegalSubsection>
    </LegalSection>
  );
};