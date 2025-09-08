import { LegalSection, LegalList, LegalParagraph } from "../LegalSection";

export const DataSecurity = () => {
  const securityMeasures = [
    "Encryption of data in transit and at rest",
    "Regular security audits and monitoring",
    "Access controls and authentication requirements",
    "Secure data centers and infrastructure",
    "Regular backups and disaster recovery procedures"
  ];

  return (
    <LegalSection title="Data Security">
      <LegalParagraph>
        We implement industry-standard security measures to protect your information:
      </LegalParagraph>
      
      <LegalList items={securityMeasures} />
    </LegalSection>
  );
};