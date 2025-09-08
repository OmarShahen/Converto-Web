"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo/Logo";

export const HomeNavigationBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-[#607AFB] transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-[#607AFB] transition-colors duration-200 font-medium"
            >
              How it Works
            </a>
            <a
              href="/pricing"
              className="text-gray-700 hover:text-[#607AFB] transition-colors duration-200 font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-[#607AFB] transition-colors duration-200 font-medium"
            >
              Reviews
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-[#607AFB] font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-gradient-to-r from-[#607AFB] to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#607AFB] transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-700 hover:text-[#607AFB] font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-700 hover:text-[#607AFB] font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-700 hover:text-[#607AFB] font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-gray-700 hover:text-[#607AFB] font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    router.push("/auth/signin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#607AFB] font-medium transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    router.push("/auth/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-[#607AFB] to-purple-600 text-white px-4 py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-200 text-center"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
