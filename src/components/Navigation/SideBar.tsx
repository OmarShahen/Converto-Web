"use client";
import clsx from "clsx";
import {
  ArrowLeft,
  CalendarRange,
  ChartColumnIncreasing,
  ChartColumnStacked,
  ChartNoAxesCombined,
  CreditCard,
  Facebook,
  House,
  Instagram,
  MessageCircleMore,
  MessageSquare,
  MessagesSquare,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { TokensDisplay } from "./TokensDisplay";

export default function SideBar({
  isShow,
  setIsShow,
}: {
  isShow: boolean;
  setIsShow: () => void;
}) {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      header: "Main",
      tabs: [
        {
          name: "Dashbard",
          icon: <ChartNoAxesCombined size={15} />,
          url: "/app/dashboard",
        },
        {
          name: "Chat Playground",
          icon: <MessagesSquare size={15} />,
          url: "/app/chats/playground",
        },
      ],
    },
    {
      header: "Store Management",
      tabs: [
        {
          name: "Stores",
          icon: <House size={15} />,
          url: "/app/stores",
        },
        {
          name: "Items",
          icon: <ShoppingBag size={15} />,
          url: "/app/items",
        },
        {
          name: "Categories",
          icon: <ChartColumnStacked size={15} />,
          url: "/app/categories",
        },
      ],
    },
    {
      header: "Channels",
      tabs: [
        {
          name: "Facebook",
          icon: <Facebook size={15} />,
          url: "/app/facebook-pages",
        },
        {
          name: "Instagram",
          icon: <Instagram size={15} />,
          url: "/app/instagram-pages",
        },
      ],
    },
    {
      header: "Engagement",
      tabs: [
        {
          name: "Chats",
          icon: <MessageSquare size={15} />,
          url: "/app/chats",
        },
        {
          name: "Messages",
          icon: <MessageCircleMore size={15} />,
          url: "/app/messages",
        },
      ],
    },
    {
      header: "Billing & Usage",
      tabs: [
        {
          name: "Subscriptions",
          icon: <CalendarRange size={15} />,
          url: "/app/subscriptions",
        },
        {
          name: "Payments",
          icon: <CreditCard size={15} />,
          url: "/app/payments",
        },
        {
          name: "Tokens Usage",
          icon: <ChartColumnIncreasing size={15} />,
          url: "/app/tokens-usage",
        },
      ],
    },
  ];

  return (
    <aside
      className={clsx(
        isShow ? "block" : "hidden md:block",
        "z-100 bg-white min-h-screen border-r border-[#E5E7EB] fixed left-0 top-0 h-screen md:w-48 lg:w-64 flex flex-col"
      )}
    >
      <div className="px-4">
        <div
          onClick={setIsShow}
          className="block md:hidden mt-4 cursor-pointer"
        >
          <ArrowLeft className="text-gray-500" />
        </div>
        <div className="py-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 pb-20 custom-scrollbar"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {sidebarLinks.map((sidebar, index) => {
          return (
            <div key={index}>
              <p className="text-[#6B7280] text-[.8rem] pt-4 pb-2 font-[500]">
                {sidebar.header}
              </p>
              <ul>
                {sidebar.tabs.map((tab) => (
                  <li
                    key={tab.name}
                    className={clsx(
                      "group flex flex-col justify-center py-1 cursor-pointer",
                      pathname === tab.url
                        ? "bg-indigo-100 text-white rounded-sm"
                        : "text-[#282828] hover:bg-indigo-100 hover:rounded-sm hover:text-indigo-500"
                    )}
                  >
                    <Link
                      href={tab.url}
                      className={clsx(
                        "flex items-center gap-x-2 px-2 font-[400] text-[.9rem] group-hover:text-indigo-500 group-hover:font-[500]",
                        pathname === tab.url
                          ? "text-indigo-500 font-[500]"
                          : "text-[#4B5563]"
                      )}
                    >
                      {tab.icon}
                      <span>{tab.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <TokensDisplay />
      </div>
    </aside>
  );
}
