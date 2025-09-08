interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const LegalSection = ({ title, children, className = "" }: LegalSectionProps) => {
  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-[#0d151c] mb-4">{title}</h2>
      {children}
    </section>
  );
};

interface LegalSubsectionProps {
  title: string;
  children: React.ReactNode;
}

export const LegalSubsection = ({ title, children }: LegalSubsectionProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#0d151c] mb-3">{title}</h3>
      {children}
    </div>
  );
};

interface LegalListProps {
  items: string[];
  className?: string;
}

export const LegalList = ({ items, className = "" }: LegalListProps) => {
  return (
    <ul className={`space-y-2 text-gray-700 ${className}`}>
      {items.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
  );
};

interface LegalParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const LegalParagraph = ({ children, className = "" }: LegalParagraphProps) => {
  return (
    <p className={`text-gray-700 mb-4 ${className}`}>
      {children}
    </p>
  );
};