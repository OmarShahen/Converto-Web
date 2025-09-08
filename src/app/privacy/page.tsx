"use client";

import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { PrivacyOverview } from "@/components/legal/privacy/PrivacyOverview";
import { InformationCollection } from "@/components/legal/privacy/InformationCollection";
import { InformationUsage } from "@/components/legal/privacy/InformationUsage";
import { InformationSharing } from "@/components/legal/privacy/InformationSharing";
import { DataSecurity } from "@/components/legal/privacy/DataSecurity";
import { UserRights } from "@/components/legal/privacy/UserRights";
import { DataRetention } from "@/components/legal/privacy/DataRetention";
import { InternationalTransfers } from "@/components/legal/privacy/InternationalTransfers";
import { ChildrenPrivacy } from "@/components/legal/privacy/ChildrenPrivacy";
import { PolicyUpdates } from "@/components/legal/privacy/PolicyUpdates";
import { ContactInfo } from "@/components/legal/privacy/ContactInfo";
import { PrivacyFooter } from "@/components/legal/privacy/PrivacyFooter";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <LegalPageHeader title="Privacy Policy" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 lg:p-12">
          <div className="prose prose-gray max-w-none">
            {/* Overview */}
            <PrivacyOverview />

            {/* Core Privacy Sections */}
            <InformationCollection />
            <InformationUsage />
            <InformationSharing />
            <DataSecurity />
            <UserRights />
            <DataRetention />

            {/* Additional Policies */}
            <InternationalTransfers />
            <ChildrenPrivacy />
            <PolicyUpdates />

            {/* Contact & Support */}
            <ContactInfo />

            {/* Footer */}
            <PrivacyFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
