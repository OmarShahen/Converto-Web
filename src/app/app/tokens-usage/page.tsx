"use client";
import { SectionHeader } from "@/components/SectionHeader";
import {
  Bot,
  Component,
  MessageCircleMore,
  MessagesSquare,
  Timer,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import StatsCard from "@/components/cards/statsCard";
import LineChart from "@/components/graphs/LineGraph";
import DateRangePicker from "@/components/date-picker/DatePicker";
import toast from "react-hot-toast";
import { calculateGrowth } from "@/utils/numbers";

export default function TokensUsagePage() {
  const user = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [tokensGrowthLabels, setTokensGrowthLabels] = useState([]);
  const [tokensGrowthData, setTokensGrowthData] = useState([]);

  const [tokensGrowthGroupBy, setTokensGrowthGroupBy] = useState("day");

  const [endDate, setEndDate] = useState(() => new Date());
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6); // last 7 days including today
    return date;
  });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [stats, setStats] = useState({
    totalCurrentUserTokens: 0,
    totalCurrentBotTokens: 0,
    totalPrevUserTokens: 0,
    totalPrevBotTokens: 0,
    currentTotalMessages: 0,
    prevTotalMessages: 0,
    range: 0,
  });

  useEffect(() => {
    const fetchTokensStats = async () => {
      try {
        const params = {
          userId: user?._id,
          storeId: user?.storeId,
          startDate,
          endDate,
        };

        const response = await serverRequest.get(`/v1/stats/tokens`, {
          params,
        });
        setStats(response.data.stats);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchTokensStats();
  }, [reload, user?.storeId]);

  useEffect(() => {
    const fetchTokensGrowthStats = async () => {
      try {
        const params = {
          userId: user?._id,
          storeId: user?.storeId,
          startDate,
          endDate,
          groupBy: tokensGrowthGroupBy,
        };

        const response = await serverRequest.get(`/v1/stats/tokens/growth`, {
          params,
        });

        const growthData = response.data.tokensGrowth;
        setTokensGrowthLabels(growthData.map((data: any) => data._id));
        setTokensGrowthData(growthData.map((data: any) => data.total));
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchTokensGrowthStats();
  }, [reload, tokensGrowthGroupBy, user?.storeId]);

  const handleDateChange = (range: { startDate: Date; endDate: Date }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    setReload(reload + 1);
  };

  return (
    <div>
      <SectionHeader
        title="Tokens Usage"
        childComponent={
          <DateRangePicker
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
          />
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="User"
          value={stats.totalCurrentUserTokens}
          change={calculateGrowth(
            stats.totalCurrentUserTokens,
            stats.totalPrevUserTokens
          )}
          icon={<User className="w-6 h-6 text-indigo-500" />}
          iconBg="bg-indigo-100"
          unit="token"
          rangePeriod={stats.range}
        />
        <StatsCard
          title="Bot"
          value={stats.totalCurrentBotTokens}
          change={calculateGrowth(
            stats.totalCurrentBotTokens,
            stats.totalPrevBotTokens
          )}
          unit="token"
          icon={<Bot className="w-6 h-6 text-yellow-500" />}
          iconBg="bg-yellow-100"
          rangePeriod={stats.range}
        />
        <StatsCard
          title="Total"
          value={stats.totalCurrentBotTokens + stats.totalCurrentUserTokens}
          change={calculateGrowth(
            stats.totalCurrentBotTokens + stats.totalCurrentUserTokens,
            stats.totalPrevBotTokens + stats.totalPrevUserTokens
          )}
          unit="token"
          icon={<Component className="w-6 h-6 text-red-500" />}
          iconBg="bg-red-100"
          rangePeriod={stats.range}
        />
        <StatsCard
          title="Total Messages"
          value={stats.currentTotalMessages}
          icon={<MessagesSquare className="w-6 h-6 text-green-500" />}
          iconBg="bg-green-100"
          rangePeriod={stats.range}
          change={calculateGrowth(
            stats.currentTotalMessages,
            stats.prevTotalMessages
          )}
        />
      </div>
      <br />
      <div className="grid grid-cols-1 gap-y-4 md:gap-y-0">
        <div>
          <LineChart
            title="Tokens"
            labels={tokensGrowthLabels}
            dataPoints={tokensGrowthData}
            color="#607AFB"
            setGroupBy={setTokensGrowthGroupBy}
            groupBy={tokensGrowthGroupBy}
          />
        </div>
      </div>
    </div>
  );
}
