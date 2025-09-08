"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, FileText } from "lucide-react";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  name: string;
  email: string;
  imageURL?: string;
}

export default function UserDropdownMenu({
  name = "",
  email = "",
  imageURL = "",
}: UserMenuProps) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    router.push("/auth/signin");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="focus:outline-none cursor-pointer"
      >
        <Avatar name={name} size="35" round={true} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-auto bg-white shadow rounded-sm p-4 z-50"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 border-b border-[#E5E7EB] pb-3 mb-3">
              <Avatar name={name} size="35" round={true} />
              <div>
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{email}</p>
              </div>
            </div>

            {/* Menu Options */}
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => router.push("/app/settings/user/profile")}
                className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-gray-100 text-sm text-gray-700 w-full text-left cursor-pointer"
              >
                <User size={16} /> Your Profile
              </button>
              {/*<button className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-gray-100 text-sm text-gray-700 w-full text-left cursor-pointer">
                <FileText size={16} /> Terms & Policies
              </button>*/}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-red-50 text-sm text-red-600 w-full text-left cursor-pointer"
              >
                <LogOut size={16} /> Logout
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
