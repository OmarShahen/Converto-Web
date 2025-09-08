"use client";
import SuccessfulSignupModal from "@/components/modals/SuccessModal";
import SideBar from "@/components/Navigation/SideBar";
import TopBar from "@/components/Navigation/TopBar";
import { AuthGuard } from "@/components/AuthGuard";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();

  const isCelebrate = searchParams.get("isCelebrate") === "true" ? true : false;

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowModal, setIsShowModal] = useState(isCelebrate);

  const handleIsShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <AuthGuard>
      <div>
        {isShowModal && <SuccessfulSignupModal setIsShowModal={setIsShowModal} />}
        <div className="">
          <SideBar isShow={isShowMenu} setIsShow={handleIsShowMenu} />
          <main className="bg-[#EDEDED] md:ml-48 lg:ml-64">
            <TopBar handleIsShowMenu={handleIsShowMenu} />
            <div className="min-h-screen bg-gray-50">
              <div className="container px-4 md:px-8 py-4 mx-auto">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
