"use client";

import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { LegalSection } from "@/components/legal/LegalSection";
import { BillingOverview } from "@/components/billing/BillingOverview";
import { BillingLimits } from "@/components/billing/BillingLimits";
import { BillingScenarios } from "@/components/billing/BillingScenarios";
import { BillingComparison } from "@/components/billing/BillingComparison";
import { BillingCycle } from "@/components/billing/BillingCycle";
import { BillingPolicies } from "@/components/billing/BillingPolicies";
import { BillingFAQ } from "@/components/billing/BillingFAQ";
import { BillingSupport } from "@/components/billing/BillingSupport";

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <LegalPageHeader 
        title="How Billing Works" 
        subtitle="Understanding our flexible pay-as-you-grow model"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="prose prose-gray max-w-none">
            
            {/* Overview Section */}
            <BillingOverview />

            {/* How It Works */}
            <LegalSection title="How Our Billing System Works">
              <BillingLimits />
            </LegalSection>

            {/* Usage Scenarios */}
            <BillingScenarios />

            {/* System Comparison */}
            <BillingComparison />

            {/* Payment Cycle */}
            <BillingCycle />

            {/* Policies */}
            <BillingPolicies />

            {/* FAQ */}
            <BillingFAQ />

            {/* Support */}
            <BillingSupport />

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-8 text-sm text-gray-600">
              <p>
                Last updated: {new Date().toLocaleDateString()}. This billing policy is subject to change. 
                We will notify active subscribers of any material changes to billing terms.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}