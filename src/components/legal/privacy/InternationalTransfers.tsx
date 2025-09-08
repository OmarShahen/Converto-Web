import { LegalSection, LegalList, LegalParagraph } from "../LegalSection";

export const InternationalTransfers = () => {
  const internationalTransferItems = [
    "Standard contractual clauses approved by data protection authorities",
    "Adequacy decisions for countries with equivalent data protection laws",
    "Certification schemes and codes of conduct"
  ];

  return (
    <LegalSection title="International Data Transfers">
      <LegalParagraph>
        Your information may be transferred and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers, including:
      </LegalParagraph>
      <LegalList items={internationalTransferItems} />
    </LegalSection>
  );
};