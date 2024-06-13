import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { ShoppingBagIcon } from 'lucide-react';

const CartProduct = () => {
  return (
    <div>
        <div>
        <Sheet>
              <SheetTrigger>
              <ShoppingBagIcon className={`w-6 fixed ml-32 -mt-4 md:-ml-4 h-6 text-slate-400`} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart!!</SheetTitle>
                  <SheetDescription>
                    <h2>Belum Update</h2>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
        </div>
    </div>
  )
}

export default CartProduct