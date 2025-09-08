"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Bot, MessageCircleMore, MessagesSquare, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { serverRequest } from "@/lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import StatsCard from "@/components/cards/statsCard";
import LineChart from "@/components/graphs/LineGraph";
import DateRangePicker from "@/components/date-picker/DatePicker";
import toast from "react-hot-toast";
import { calculateGrowth } from "@/utils/numbers";
import DonutChart from "@/components/graphs/DonutGraph";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(1);

  const [growthLabels, setGrowthLabels] = useState([]);
  const [growthData, setGrowthData] = useState([]);

  const [chatGrowthLabels, setChatGrowthLabels] = useState([]);
  const [chatGrowthData, setChatGrowthData] = useState([]);

  const [channelsGrowthLabels, setChannelsGrowthLabels] = useState([]);
  const [channelsGrowthData, setChannelsGrowthData] = useState([]);

  const [messageGrowthGroupBy, setMessageGrowthGroupBy] = useState("day");
  const [chatGrowthGroupBy, setChatGrowthGroupBy] = useState("day");

  const [endDate, setEndDate] = useState(() => new Date());
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6); // last 7 days including today
    return date;
  });

  const [stats, setStats] = useState({
    currentTotalReceivedMessages: 0,
    prevTotalReceivedMessages: 0,
    currentTotalBotMessages: 0,
    prevTotalBotMessages: 0,
    currentTotalChats: 0,
    prevTotalChats: 0,
    currentAverageResponseTime: 0,
    prevAverageResponseTime: 0,
    range: 0,
  });

  useEffect(() => {
    const fetchEngagementStats = async () => {
      try {
        const params = {
          userId: user?._id,
          storeId: user?.storeId,
          startDate,
          endDate,
        };

        const response = await serverRequest.get(`/v1/stats/engagement`, {
          params,
        });
        setStats(response.data.stats);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchEngagementStats();
  }, [reload, user?.storeId]);

  useEffect(() => {
    const fetchMessagesGrowthStats = async () => {
      try {
        const params = {
          userId: user?._id,
          storeId: user?.storeId,
          startDate,
          endDate,
          groupBy: messageGrowthGroupBy,
        };

        const response = await serverRequest.get(`/v1/stats/messages/growth`, {
          params,
        });

        const growthData = response.data.messagesGrowth;
        setGrowthLabels(growthData.map((data: any) => data._id));
        setGrowthData(growthData.map((data: any) => data.count));
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchMessagesGrowthStats();
  }, [reload, messageGrowthGroupBy, user?.storeId]);

  useEffect(() => {
    const fetchChatsGrowthStats = async () => {
      try {
        const params = {
          userId: user?._id,
          storeId: user?.storeId,
          startDate,
          endDate,
          groupBy: chatGrowthGroupBy,
        };

        const response = await serverRequest.get(`/v1/stats/chats/growth`, {
          params,
        });

        const growthData = response.data.chatsGrowth;
        setChatGrowthLabels(growthData.map((data: any) => data._id));
        setChatGrowthData(growthData.map((data: any) => data.count));
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchChatsGrowthStats();
  }, [reload, chatGrowthGroupBy, user?.storeId]);

  useEffect(() => {
    const fetchChannelsGrowthStats = async () => {
      try {
        const params = {
          userId: user?._id,
          storeId: user?.storeId,
          startDate,
          endDate,
        };

        const response = await serverRequest.get(
          `/v1/stats/chats/channels/growth`,
          {
            params,
          }
        );
        const growthData = response.data.chatChannelsGrowth;
        setChannelsGrowthLabels(growthData.map((data: any) => data._id));
        setChannelsGrowthData(growthData.map((data: any) => data.count));
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      }
    };

    fetchChannelsGrowthStats();
  }, [reload, user?.storeId]);

  const handleDateChange = (range: { startDate: Date; endDate: Date }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    setReload(reload + 1);
  };

  return (
    <div>
      <SectionHeader
        title="Dashboard"
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
          title="Received Messages"
          value={stats.currentTotalReceivedMessages}
          icon={<MessageCircleMore className="w-6 h-6 text-indigo-500" />}
          iconBg="bg-indigo-100"
          rangePeriod={stats.range}
          change={calculateGrowth(
            stats.currentTotalReceivedMessages,
            stats.prevTotalReceivedMessages
          )}
        />
        <StatsCard
          title="Avg Response Time"
          value={stats.currentAverageResponseTime}
          unit="sec"
          icon={<Timer className="w-6 h-6 text-sky-500" />}
          iconBg="bg-sky-100"
          rangePeriod={stats.range}
          change={calculateGrowth(
            stats.currentAverageResponseTime,
            stats.prevAverageResponseTime
          )}
        />
        <StatsCard
          title="Total Chats"
          value={stats.currentTotalChats}
          icon={<MessagesSquare className="w-6 h-6 text-green-500" />}
          iconBg="bg-green-100"
          rangePeriod={stats.range}
          change={calculateGrowth(
            stats.currentTotalChats,
            stats.prevTotalChats
          )}
        />
        <StatsCard
          title="Bot Responses"
          value={stats.currentTotalBotMessages}
          icon={<Bot className="w-6 h-6 text-yellow-500" />}
          iconBg="bg-yellow-100"
          rangePeriod={stats.range}
          change={calculateGrowth(
            stats.currentTotalBotMessages,
            stats.prevTotalBotMessages
          )}
        />
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-[49%_2%_49%] gap-y-4 md:gap-y-0">
        <div>
          <LineChart
            title="Received Messages"
            labels={growthLabels}
            dataPoints={growthData}
            color="#607AFB"
            setGroupBy={setMessageGrowthGroupBy}
            groupBy={messageGrowthGroupBy}
          />
        </div>
        <div></div>
        <div>
          <LineChart
            title="New Chats"
            labels={chatGrowthLabels}
            dataPoints={chatGrowthData}
            color="#22c55e"
            setGroupBy={setChatGrowthGroupBy}
            groupBy={chatGrowthGroupBy}
          />
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-[49%_2%_49%] gap-y-4 md:gap-y-0">
        <div>
          <DonutChart
            title="Channels"
            labels={channelsGrowthLabels}
            dataPoints={channelsGrowthData}
          />
        </div>
      </div>
    </div>
  );
}
