"use client";
import { SectionHeader } from "@/components/SectionHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function StoreFormLayout({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const storeId = searchParams.get("storeId");
  const mode = searchParams.get("mode");

  const links = [
    {
      url: `/app/stores/form/store-info`,
      href: storeId
        ? `/app/stores/form/store-info?storeId=${storeId}&mode=${mode}`
        : `/app/stores/form/store-info`,
      text: "Store Info",
    },
    {
      url: `/app/stores/form/assistant-setup`,
      href: `/app/stores/form/assistant-setup?storeId=${storeId}&mode=${mode}`,
      text: "Assistant Setup",
    },
    {
      url: `/app/stores/form/shipping-policy`,
      href: `/app/stores/form/shipping-policy?storeId=${storeId}&mode=${mode}`,
      text: "Shipping Policy",
    },
    {
      url: `/app/stores/form/refund-policy`,
      href: `/app/stores/form/refund-policy?storeId=${storeId}&mode=${mode}`,
      text: "Refund Policy",
    },
    {
      url: `/app/stores/form/payment-methods`,
      href: `/app/stores/form/payment-methods?storeId=${storeId}&mode=${mode}`,
      text: "Payment Methods",
    },
    {
      url: `/app/stores/form/integrations`,
      href: `/app/stores/form/integrations?storeId=${storeId}&mode=${mode}`,
      text: "Channels",
    },
  ];

  return (
    <div>
      <SectionHeader
        title={mode === "UPDATE" ? "Update Store" : "Create Store"}
      />
      <div className="shadow bg-white p-4 rounded-sm">
        <div className="flex space-x-4 overflow-x-auto space-x-8 scrollbar-hide border-b border-solid border-b-[#ededed]">
          {links.map((linkObj) => {
            return (
              <Link
                className={`whitespace-nowrap text-sm text-[#101418] hover:border-b-4 pb-2 hover:border-b-[#607AFB] hover:font-bold ${
                  pathname === linkObj.url
                    ? `border-b-4 border-b-[#607AFB] font-bold`
                    : `font-medium`
                }`}
                key={linkObj.href}
                href={storeId ? linkObj.href : "#"}
              >
                {linkObj.text}
              </Link>
            );
          })}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
