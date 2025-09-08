"use client";
import Button from "@/components/buttons/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import StepsProgressBar from "@/components/StepsProgressBar";
import { RootState } from "@/store";
import { SocialsButton } from "@/components/buttons/SocialsButton";
import { FacebookIcon } from "@/components/icons/facebook";

export default function OnboardingGrantPermissionPage() {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="mb-8">
        <StepsProgressBar currentStep={3} totalSteps={4} />
      </div>
      <div>
        <h1 className="mb-2 text-2xl md:text-3xl font-bold text-custom-heading-black">
          Allow Access to Continue
        </h1>
        <h6 className="text-xs md:text-sm font-normal text-[#757575] m-0 p-0">
          It requires certain permissions to build automations with Messenger.
          Click the button to grant them.
        </h6>
      </div>

      <div className="flex flex-col gap-4">
        <SocialsButton
          text="Continue With Facebook"
          icon={<FacebookIcon color={"#FFF"} />}
          onClick={() => {
            window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FACEBOOK_CALLBACK}&scope=pages_messaging,pages_manage_metadata,pages_show_list,instagram_basic,instagram_manage_messages&state=${user?._id}`;
          }}
          style={`bg-[#0084ff] text-white`}
        />
        <Button
          type="button"
          disabled={isLoading}
          className="border-[#607AFB]! border-2 bg-white! text-[#607AFB]!"
          onClick={() => router.push("/onboarding/successful-connection")}
        >
          Skip
        </Button>
      </div>
    </>
  );
}
