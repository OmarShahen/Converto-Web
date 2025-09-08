"use client";

import Avatar from "react-avatar";
import { Bell, ChevronsUpDown, Crown, Menu, Plus, Rocket } from "lucide-react";
import Button from "../buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import Dropdown from "../Dropdowns/Dropdown";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverRequest } from "@/lib/axios";
import { setStoreId } from "@/store/userSlice";
import UserDropdownMenu from "../menu/UserDropdownMenu";

export default function TopBar({
  handleIsShowMenu,
}: {
  handleIsShowMenu: () => void;
}) {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState({
    label: user?.storeName ? user.storeName : "All Stores",
    value: user?.storeId ? user.storeId : null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const params = { userId: user?._id };
        const response = await serverRequest.get(`/v1/stores`, { params });
        const stores = response.data.stores;
        let storesOptions = stores.map((store: any) => {
          return { label: store.name, value: store._id };
        });
        storesOptions = [
          { label: "All Stores", value: null },
          ...storesOptions,
        ];
        setStores(storesOptions);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "There was an error");
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchUserActiveSubscription = async () => {
      try {
        setIsLoading(true);
        const response = await serverRequest.get(
          `/v1/users/${user?._id}/subscriptions/active`
        );
        setActiveSubscription(response.data.subscription);
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || "there was a problem");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserActiveSubscription();
  }, []);

  const handleSelectStore = (storeObj: {
    label: string;
    value: string | null;
  }) => {
    const storeId = storeObj.value ? storeObj.value : null;
    const storeName = storeObj.label;
    dispatch(setStoreId({ storeId, storeName }));
    setSelectedStore(storeObj);
  };

  return (
    <div className="bg-white px-4 py-2 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 z-10">
      <div className="hidden md:block">
        <strong className="font-[600] text-[1.2rem]">
          Hi, <span className="text-[#607AFB]">{user?.firstName}</span>
        </strong>
        <br />
        <span className="font-[400] text-[.9rem] text-[#6B7280] flex items-center">
          <span className="hidden lg:block">
            Here's what's happening today in
          </span>
          <Dropdown
            items={stores}
            selected={selectedStore}
            onSelect={handleSelectStore}
          />
        </span>
      </div>
      <div
        onClick={handleIsShowMenu}
        className="block md:hidden cursor-pointer"
      >
        <Menu />
      </div>
      <div className="flex items-center justify-center gap-x-6">
        {isLoading ? null : activeSubscription ? (
          <div className="flex items-center space-x-2">
            <span className="shadow-sm flex items-center px-4 py-2  rounded-sm bg-yellow-100 text-yellow-700 font-medium">
              👑 Subscribed
            </span>
          </div>
        ) : (
          <Button
            onClick={() => router.push("/pricing")}
            className="!hidden md:!flex items-center justify-center rounded-lg bg-white !text-[#607AFB] border border-[#607AFB]"
            fullWidth={false}
          >
            <Crown size={20} />
            <span className="ml-2">Upgrade</span>
          </Button>
        )}

        <Button
          className="items-center justify-center rounded-lg !hidden md:!flex"
          fullWidth={false}
          onClick={() => router.push(`/onboarding/store/basic-info`)}
        >
          <Plus size={20} />
          <span className="ml-2">Create Store</span>
        </Button>
        <UserDropdownMenu
          name={user?.firstName || ""}
          imageURL={user?.imageURL}
          email={user?.email || ""}
        />
      </div>
    </div>
  );
}
