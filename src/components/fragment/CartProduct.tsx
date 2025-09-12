"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Loader2, ShoppingBagIcon, TrashIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { useApi } from "../utils/GlobalApi";
import { useToast } from "../ui/use-toast";
import { useCreateTx } from "../hooks/useTransaction";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";
import { on } from "events";

const CartProduct = () => {
  const auth = useAuth();
  const token = auth.token;

  const { cart, removeItem, clearCart } = useCart();
  const api = useApi();
  const { toast } = useToast();
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartMutation = useCreateTx();

  const handleCheckOut = () => {
    try {
      // decode token;
      const decode: any = jwtDecode(token as string);

      // payload tx
      const payload = {
        userId: decode.id,
        gross_amount: totalPrice,
        products: cart.map((item: any) => ({
          productId: item.id,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      //  logic transactions
      cartMutation.mutate(payload, {
        onSuccess(data: any) {
          toast({
            title: "Transaction Successfully",
            description: "Redirecting to payment...",
            variant: "default",
          });
          if (typeof window !== "undefined" && (window as any).snap) {
            (window as any).snap.pay(data.paymentToken, {
              onSuccess(result: any) {
                toast({
                  title: "Transaction Successfully",
                  description: "Thank you for shopping",
                  variant: "default",
                });
                console.log(result);

                clearCart();
              },
              onPending: () => {
                toast({ title: "Payment Pending", variant: "default" });
              },
              onError: (err: unknown) => {
                toast({ title: "Payment Failed", variant: "destructive" });
                console.log(err);
              },
              onClose: () => {
                toast({
                  title: "Payment Closed",
                  description: "You closed the popup",
                });
              },
            });
          }
        },
        onError(err) {
          toast({
            title: "Transaction Failed",
            description: err.message,
            variant: "destructive",
          });
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-center items-center ml-52 md:ml-0 p-1 w-4 h-4 bg-black text-[12px] text-white font-semibold rounded-full">
          {cart.length}
        </div>
        <Sheet>
          <SheetTrigger>
            <ShoppingBagIcon
              className={`w-6 fixed -mt-7 ml-48 md:-ml-4 h-6 text-[#111]`}
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart!!</SheetTitle>
            </SheetHeader>
            {cart.length === 0 ? (
              <div>
                <h2>No Item in Your Cart</h2>
              </div>
            ) : (
              <ScrollArea className="w-[350px] h-[250px] border border-slate-300 p-4 rounded-md">
                <div className="grid grid-col-1 gap-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row items-center justify-center gap-3"
                    >
                      <Image
                        src={item.imageUrl}
                        alt="item"
                        width={120}
                        height={120}
                        className="w-auto h-auto"
                      />
                      <div className="flex flex-col gap-2">
                        <h3>{item.title}</h3>
                        <h5>${item.price}</h5>
                        <div className="flex flex-row gap-2">
                          <span>size: {item.size}</span>
                          <span>qty: {item.quantity}</span>
                        </div>
                        <Button
                          variant={"destructive"}
                          onClick={() => removeItem(item.id)}
                        >
                          <TrashIcon />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
            <SheetFooter className="mt-8">
              <h2>Total: ${totalPrice}</h2>
            </SheetFooter>
            <div className="mt-8">
              <Button
                variant={"default"}
                className="w-full rounded-md"
                onClick={handleCheckOut}
              >
                {cartMutation.isPending ? <Loader2 /> : "Checkout"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartProduct;
