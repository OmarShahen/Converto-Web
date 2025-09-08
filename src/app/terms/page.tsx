"use client";

import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { TermsOverview } from "@/components/legal/terms/TermsOverview";
import { ServiceDescription } from "@/components/legal/terms/ServiceDescription";
import { UserResponsibilities } from "@/components/legal/terms/UserResponsibilities";
import { PaymentTerms } from "@/components/legal/terms/PaymentTerms";
import { ServiceLimitations } from "@/components/legal/terms/ServiceLimitations";
import { TerminationPolicy } from "@/components/legal/terms/TerminationPolicy";
import { TermsContact } from "@/components/legal/terms/TermsContact";
import { LegalSection, LegalParagraph } from "@/components/legal/LegalSection";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <LegalPageHeader title="Terms of Service" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="prose prose-gray max-w-none">
            
            {/* Overview */}
            <TermsOverview />

            {/* Agreement Acceptance */}
            <LegalSection title="Acceptance of Terms">
              <LegalParagraph>
                By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </LegalParagraph>
            </LegalSection>

            {/* Service Description */}
            <ServiceDescription />

            {/* User Responsibilities */}
            <UserResponsibilities />

            {/* Payment Terms */}
            <PaymentTerms />

            {/* Service Limitations */}
            <ServiceLimitations />

            {/* Intellectual Property */}
            <LegalSection title="Intellectual Property Rights">
              <LegalParagraph>
                All content, features, and functionality of our service, including but not limited to text, graphics, logos, 
                icons, images, audio clips, and software, are the exclusive property of our company and are protected by 
                copyright, trademark, and other intellectual property laws.
              </LegalParagraph>
              <LegalParagraph>
                You retain ownership of your business data and customer interactions. We retain ownership of our AI technology, 
                algorithms, and platform infrastructure.
              </LegalParagraph>
            </LegalSection>

            {/* Privacy Policy Reference */}
            <LegalSection title="Privacy Policy">
              <LegalParagraph>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                to understand our practices regarding the collection and use of your personal information.
              </LegalParagraph>
            </LegalSection>

            {/* Termination */}
            <TerminationPolicy />

            {/* Governing Law */}
            <LegalSection title="Governing Law">
              <LegalParagraph>
                These Terms of Service and any separate agreements whereby we provide you services shall be governed by and 
                construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from these terms will be 
                resolved through binding arbitration in [Your Jurisdiction].
              </LegalParagraph>
            </LegalSection>

            {/* Changes to Terms */}
            <LegalSection title="Changes to Terms of Service">
              <LegalParagraph>
                We reserve the right to update or modify these Terms of Service at any time without prior notice. 
                Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Service.
              </LegalParagraph>
              <LegalParagraph>
                We will notify users of material changes via email or prominent notice on our platform.
              </LegalParagraph>
            </LegalSection>

            {/* Contact Information */}
            <TermsContact />

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 text-sm text-gray-600">
              <p>
                These Terms of Service are effective as of the date stated above and will remain in effect except with respect to any changes in their provisions in the future, which will be in effect immediately after being posted on this page.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}