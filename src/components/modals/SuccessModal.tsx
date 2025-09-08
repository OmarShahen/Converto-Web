"use client";

import { useRouter } from "next/navigation";
import ConfettiEffect from "../celebration/celebration";
import { CheckCircle } from "lucide-react";
import Button from "../buttons/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface SuccessfulSignupModalProps {
  setIsShowModal: (show: boolean) => void;
}

export default function SuccessfulSignupModal({
  setIsShowModal,
}: SuccessfulSignupModalProps) {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-500 p-4">
      {/* 🎉 Confetti Effect */}
      <ConfettiEffect duration={60000} />

      <div className="bg-white rounded-sm shadow-lg p-6 w-full max-w-lg overflow-y-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">
            🎉 Congratulations, {user?.firstName}!
          </h1>
        </div>

        {/* Intro */}
        <p className="text-gray-600 mb-4">
          We’re excited to have you on board! There are still a few steps before
          your store's chatbot is fully active:
        </p>

        {/* Steps */}
        <ul className="space-y-3 text-gray-700 mb-4">
          <li className="flex gap-2 items-start">
            <CheckCircle
              className="text-green-500 flex-shrink-0 mt-0.5"
              size={20}
            />
            <span>
              <strong>Create your store</strong> if you haven’t already done so.
            </span>
          </li>
          <li className="flex gap-2 items-start">
            <CheckCircle
              className="text-green-500 flex-shrink-0 mt-0.5"
              size={20}
            />
            <span>
              <strong>Fill in your store’s categories</strong> to help organize
              your products.
            </span>
          </li>
          <li className="flex gap-2 items-start">
            <CheckCircle
              className="text-green-500 flex-shrink-0 mt-0.5"
              size={20}
            />
            <span>
              <strong>Add your items</strong> so customers can browse and order
              from your store.
            </span>
          </li>
          <li className="flex gap-2 items-start">
            <CheckCircle
              className="text-green-500 flex-shrink-0 mt-0.5"
              size={20}
            />
            <span>
              <strong>Toggle Messenger connection to “Active”</strong> to let
              your bot automatically respond to customer messages.
            </span>
          </li>
        </ul>

        {/* Closing text */}
        <p className="text-gray-600 mb-6">
          Once you’ve completed these steps, your store's chatbot will be ready
          to welcome customers!
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            fullWidth={false}
            onClick={() => {
              setIsShowModal(false);
            }}
          >
            Let&apos;s get started!
          </Button>
        </div>
      </div>
    </div>
  );
}
