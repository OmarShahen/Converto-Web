import { Clock, Zap, CheckCircle } from "lucide-react";
import { LegalSection, LegalParagraph } from "../legal/LegalSection";

interface Scenario {
  title: string;
  icon: React.ReactNode;
  status: string;
  description: string;
  result: string;
  action: string;
  color: string;
}

export const BillingScenarios = () => {
  const billingScenarios: Scenario[] = [
    {
      title: "Scenario 1: Heavy Usage - Add More Tokens",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      status: "Flexible Top-up",
      description: "You're using tokens faster than expected and need more before your plan expires.",
      result: "Simply purchase another plan! New tokens are added to your current balance immediately.",
      action: "✅ Buy additional plan → Tokens added to existing balance",
      color: "border-blue-200 bg-blue-50"
    },
    {
      title: "Scenario 2: Business Growth - Scale Up",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      status: "Growth-Friendly",
      description: "Your business is growing and you need more resources mid-cycle.",
      result: "Add multiple plans as needed. All tokens and time periods accumulate together.",
      action: "📈 Purchase higher-tier plan → Extended resources available instantly",
      color: "border-green-200 bg-green-50"
    },
    {
      title: "Scenario 3: Expired Plan - Seamless Restart",
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      status: "No Interruption",
      description: "Your plan expired but you want to continue using the service immediately.",
      result: "Purchase a new plan anytime, even after expiration. Service resumes instantly.",
      action: "🚀 Buy new plan → Immediate reactivation with fresh resources",
      color: "border-purple-200 bg-purple-50"
    }
  ];

  return (
    <LegalSection title="Real-World Usage Scenarios">
      <LegalParagraph>
        Here's how our flexible billing system adapts to different business needs:
      </LegalParagraph>

      <div className="space-y-6">
        {billingScenarios.map((scenario, index) => (
          <div key={index} className={`rounded-lg p-6 border-2 ${scenario.color}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {scenario.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-[#0d151c] mb-2">
                  {scenario.title}
                </h4>
                <p className="text-gray-700 mb-3">
                  {scenario.description}
                </p>
                <div className="bg-white/60 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-gray-800">
                    <strong>Solution:</strong> {scenario.result}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {scenario.action}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LegalSection>
  );
};