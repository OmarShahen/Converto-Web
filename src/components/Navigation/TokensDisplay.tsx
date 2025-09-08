"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { serverRequest } from "@/lib/axios";
import { Zap, CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export const TokensDisplay = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [tokensData, setTokensData] = useState({
    remaining: 0,
    total: 0,
    isLoading: true,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTokensUsage = async (isRefresh = false) => {
    try {
      if (!user?._id) return;

      if (isRefresh) setIsRefreshing(true);

      const response = await serverRequest.get(
        `/v1/subscriptions/users/${user._id}/tokens-usage`
      );
      const { totalTokensLimit, totalTokensUsed } = response.data;
      const remaining = totalTokensLimit - totalTokensUsed;

      setTokensData({
        remaining: remaining || 0,
        total: totalTokensLimit || 1000,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
      setTokensData({
        remaining: 0,
        total: 1000,
        isLoading: false,
      });
    } finally {
      if (isRefresh) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTokensUsage();
  }, [user?._id]);

  const handleRefresh = () => {
    fetchTokensUsage(true);
  };

  const getProgressColor = (remaining: number, total: number) => {
    const remainingPercentage = (remaining / total) * 100;
    if (remainingPercentage > 50) return "bg-green-500"; // Many tokens - green
    if (remainingPercentage > 20) return "bg-[#607AFB]"; // Medium tokens - app primary color
    return "bg-red-500"; // Low tokens - red
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  if (tokensData.isLoading) {
    return (
      <div className="border-t border-[#E5E7EB] p-4 bg-white animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-2 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const remainingPercentage = Math.max(
    0,
    (tokensData.remaining / tokensData.total) * 100
  );

  const usagePercentage = Math.min(
    100,
    ((tokensData.total - tokensData.remaining) / tokensData.total) * 100
  );

  return (
    <div className="border-t border-[#E5E7EB] p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-[#607AFB]" />
          <span className="text-sm font-medium text-gray-700">Tokens</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-xs text-[#607AFB] hover:text-[#4F46E5] transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={clsx("transition-transform", isRefreshing && "animate-spin")} />
          </button>
          <Link
            href="/app/tokens-usage"
            className="text-xs text-[#607AFB] hover:text-[#4F46E5] transition-colors"
          >
            Details
          </Link>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Remaining</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatNumber(tokensData.remaining)} /{" "}
            {formatNumber(tokensData.total)}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={clsx(
              "h-2 rounded-full transition-all duration-500 ease-out",
              getProgressColor(tokensData.remaining, tokensData.total)
            )}
            style={{ width: `${remainingPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        {remainingPercentage > 50 && (
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle size={12} />
            <span>You're all set</span>
          </div>
        )}
        {remainingPercentage <= 50 && remainingPercentage > 20 && (
          <div className="flex items-center gap-1 text-[#607AFB] font-medium">
            <AlertTriangle size={12} />
            <span>Running low</span>
          </div>
        )}
        {remainingPercentage <= 20 && (
          <div className="flex items-center gap-1 text-red-600 font-medium">
            <AlertCircle size={12} />
            <span>Upgrade needed</span>
          </div>
        )}
      </div>
    </div>
  );
};
