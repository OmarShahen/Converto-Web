"use client";

import { Check, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CircularLoading from "@/components/Loader";

export default function PricingSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preSelectedPlan, setPreSelectedPlan] = useState<string | null>(null);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  // Convert cents to EGP
  const formatPrice = (priceInCents: number) => {
    if (priceInCents === 0) return "0";
    return (priceInCents / 100).toFixed(0);
  };

  // Format duration to readable period
  const formatDuration = (days: number) => {
    if (days === 1) return "day";
    if (days <= 14) return `${days} days`;
    if (days === 30) return "month";
    if (days === 365) return "year";
    return `${days} days`;
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        const response = await serverRequest.get(`/v1/plans`, {
          params: { isActive: "true" },
        });
        if (response.data.plans && response.data.plans.length > 0) {
          setPlans(response.data.plans);
        } else {
          setPlans([]);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to load plans");
        setPlans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getStyleForPlan = (plan: any) => {
    if (plan.isPopular) {
      return {
        buttonStyle: "bg-[#607AFB] text-white hover:bg-[#507AFB]",
        background: "bg-white",
        border: "border-[#607AFB]",
      };
    }
    return {
      buttonStyle:
        "border-2 border-[#607AFB] text-[#607AFB] hover:bg-[#607AFB] hover:text-white",
      background: "bg-slate-50",
      border: "border-[#cedce8]",
    };
  };

  const handleSelectPlan = async (plan: any) => {
    // Check if user is authenticated
    if (!user || !user._id) {
      router.push("/auth/signup");
      return;
    }

    if (!plan.price) {
      router.push("/app/dashboard");
      return;
    }

    const planId = plan._id;
    try {
      setLoading(planId);

      const paymentData = { userId: user._id, planId };
      const response = await serverRequest.post(
        "/v1/payments/url",
        paymentData
      );

      window.location.href = response.data.iFrameURL;
    } catch (error: any) {
      console.error("Error selecting plan:", error);
      toast.error(
        error?.response?.data?.message || "Failed to process plan selection"
      );
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Pricing Section */}
      <div className="py-16 lg:py-20">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[#0d151c] text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight tracking-[-0.015em] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#49749c] text-base sm:text-lg font-normal leading-normal mb-2">
            Start free, upgrade as you grow
          </p>
          <p className="text-[#49749c] text-sm font-normal leading-normal">
            All plans include multi-channel integration (Facebook, Instagram,
            WhatsApp)
          </p>
        </div>

        {isLoading ? (
          <div className="py-16">
            <CircularLoading />
          </div>
        ) : (
          <>
            {/* Desktop: 2-column centered layout */}
            <div className="hidden sm:block">
              <div className="flex justify-center gap-8 px-4 max-w-4xl mx-auto">
                {plans
                  .slice()
                  .reverse()
                  .map((plan: any) => {
                    const planStyle = getStyleForPlan(plan);
                    const planId = plan._id || plan.id;

                    return (
                      <div
                        key={planId}
                        className={`flex-1 max-w-sm flex flex-col gap-6 rounded-2xl border border-solid ${
                          planStyle.border
                        } ${
                          planStyle.background
                        } p-6 lg:p-8 relative transition-all duration-200 hover:scale-105 ${
                          plan.isPopular ? "shadow-lg transform scale-105" : ""
                        } ${
                          preSelectedPlan === planId
                            ? "ring-2 ring-[#607AFB] ring-opacity-50 shadow-xl"
                            : ""
                        }`}
                      >
                        {plan.isPopular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-full bg-[#607AFB] px-4 py-2">
                              Most Popular
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#0d151c] text-xl font-bold leading-tight">
                            {plan.name}
                          </h3>
                          <p className="text-[#49749c] text-sm font-normal leading-normal">
                            {plan.description}
                          </p>
                          <div className="flex items-baseline gap-1 text-[#0d151c] mt-2">
                            <span className="text-[#0d151c] text-4xl font-black leading-tight tracking-[-0.033em]">
                              {formatPrice(plan.price)} EGP
                            </span>
                            <span className="text-[#0d151c] text-base font-bold leading-tight">
                              /{formatDuration(plan.duration)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSelectPlan(plan)}
                          disabled={loading === planId}
                          className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 text-sm font-bold leading-normal tracking-[0.015em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${planStyle.buttonStyle}`}
                        >
                          <span className="truncate">
                            {loading === planId
                              ? "Processing..."
                              : plan.price === 0
                              ? "Start Free Trial"
                              : "Get Started"}
                          </span>
                        </button>

                        <div className="flex flex-col gap-3">
                          {plan.features?.map(
                            (feature: string, index: number) => (
                              <div
                                key={index}
                                className="text-sm font-normal leading-normal flex gap-3 text-[#0d151c]"
                              >
                                <Check size="20" color="#607AFB" />
                                {feature}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Mobile: Horizontal scroll */}
            <div className="sm:hidden px-4">
              <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory pricing-scroll">
                {plans
                  .slice()
                  .reverse()
                  .map((plan: any) => {
                    const planStyle = getStyleForPlan(plan);
                    const planId = plan._id || plan.id;

                    return (
                      <div
                        key={planId}
                        className={`flex-shrink-0 w-80 flex flex-col gap-6 rounded-2xl border border-solid ${
                          planStyle.border
                        } ${
                          planStyle.background
                        } p-6 relative transition-all duration-200 snap-center ${
                          plan.isPopular ? "shadow-lg" : ""
                        } ${
                          preSelectedPlan === planId
                            ? "ring-2 ring-[#607AFB] ring-opacity-50 shadow-xl"
                            : ""
                        }`}
                      >
                        {plan.isPopular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-full bg-[#607AFB] px-4 py-2">
                              Most Popular
                            </span>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <h3 className="text-[#0d151c] text-xl font-bold leading-tight">
                            {plan.name}
                          </h3>
                          <p className="text-[#49749c] text-sm font-normal leading-normal">
                            {plan.description}
                          </p>
                          <div className="flex items-baseline gap-1 text-[#0d151c] mt-2">
                            <span className="text-[#0d151c] text-4xl font-black leading-tight tracking-[-0.033em]">
                              {formatPrice(plan.price)} EGP
                            </span>
                            <span className="text-[#0d151c] text-base font-bold leading-tight">
                              /{formatDuration(plan.duration)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSelectPlan(plan)}
                          disabled={loading === planId}
                          className={`flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 text-sm font-bold leading-normal tracking-[0.015em] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${planStyle.buttonStyle}`}
                        >
                          <span className="truncate">
                            {loading === planId
                              ? "Processing..."
                              : plan.price === 0
                              ? "Start Free Trial"
                              : "Get Started"}
                          </span>
                        </button>

                        <div className="flex flex-col gap-3">
                          {plan.features?.map(
                            (feature: string, index: number) => (
                              <div
                                key={index}
                                className="text-sm font-normal leading-normal flex gap-3 text-[#0d151c]"
                              >
                                <Check size="20" color="#607AFB" />
                                {feature}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Scroll indicators */}
              <div className="flex justify-center mt-4">
                <div className="flex gap-2">
                  {plans.map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 rounded-full bg-gray-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-[#49749c] text-base font-medium mb-4">
            Need a custom plan?{" "}
            <a href="#" className="text-[#607AFB] underline">
              Contact our sales team
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm text-[#49749c]">
            <div className="flex items-center gap-2">
              <Check size="16" color="#22c55e" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check size="16" color="#22c55e" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check size="16" color="#22c55e" />
              30-day money back guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
