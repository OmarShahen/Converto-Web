import { LegalSection, LegalList, LegalParagraph } from "../LegalSection";

export const PolicyUpdates = () => {
  const policyUpdateItems = [
    "Email notification to your registered email address",
    "Prominent notice on our platform",
    "Updates to the \"Last updated\" date at the top of this policy"
  ];

  return (
    <LegalSection title="Updates to This Policy">
      <LegalParagraph>
        We may update this Privacy Policy from time to time. We will notify you of any material changes by:
      </LegalParagraph>
      <LegalList items={policyUpdateItems} className="mb-6" />
      <LegalParagraph>
        Your continued use of our service after any changes constitutes acceptance of the updated Privacy Policy.
      </LegalParagraph>
    </LegalSection>
  );
};