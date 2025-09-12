"use client";
import FetchProductitem from "@/components/fragment/FetchProductCategory";
import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/components/utils/GlobalApi";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import React from "react";

const Brands = ({ params: { name } }: any) => {
  const { toast } = useToast();
  const api = useApi();

  const { data, isLoading } = useQuery({
    queryKey: ["productByName"],
    queryFn: async () => {
      const res = await api.get(`/product/${name}`);
      toast({
        title: "Success",
        description: res.data.message,
        variant: "default",
      });
      return res.data.product;
    },
    retry: 0, // jangan auto-retry
    refetchOnWindowFocus: false, // jangan refetch tiap ganti tab
    refetchOnReconnect: false, // jangan refetch tiap reconnect internet
    staleTime: 1000 * 60 * 5, // data dianggap fresh 5 menit
  });


  return (
    <div className="flex flex-row gap-4">
      <div className="mx-72 my-20 mt-40">
        <div>
          {isLoading ? (
            <div className="h-screen">
            <h2 className="font-bold text-3xl flex ml-[450px] mt-40 flex-row justify-center items-center gap-2 text-black">
              <span>
                <LoaderCircleIcon className="text-[#111] w-8 h-auto animate-spin" />
              </span>{" "}
            </h2>
          </div>
          ) : (
            <FetchProductitem items={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;
