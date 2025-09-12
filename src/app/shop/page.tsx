"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/components/utils/GlobalApi";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Shop = () => {
  const api = useApi();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await api.get("/products");
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
    <>
      <div className="p-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <h2 className="font-bold text-3xl flex flex-row justify-center items-center gap-2 text-black">
              <span>
                <LoaderCircleIcon className="text-[#111] w-8 h-auto animate-spin" />
              </span>{" "}
            </h2>
          </div>
        ) : (
          <div className="grid grid-col-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {data?.map((item: any, index: number) => (
              <div key={item.id}>
                <div className="flex flex-col gap-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={400}
                    height={365}
                    className="w-96 h-auto"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-black text-lg">
                      {item.title}
                    </h3>
                    <h3 className="font-semibold text-black text-xs">
                      ${item.price}
                    </h3>
                  </div>
                </div>
                <Link
                  href={`/products/${item.title}`}
                  key={index}
                  className="mt-[15px]"
                >
                  <Button variant={"default"}>View Product</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-0 -mx-3 md:mt-0 mt-12 md:p-24"></div>
      </div>
    </>
  );
};

export default Shop;
