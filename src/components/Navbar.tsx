"use client";
import Link from "next/link";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import React, { useEffect, useState } from "react";
import CustomButton from "./fragment/CustomButton";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CartProduct from "./fragment/CartProduct";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [userName, setUserName] = useState();
  const router = useRouter();
// sticky header
  useEffect(() => {
    getToken();
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // get login user

  const getToken = () => {
   const token = localStorage.getItem("token");
    if (token) {
      setIslogin(true)
    }
  }

  const logoutUser = () => {
    setIslogin(false);
    localStorage.removeItem("token")
  }

  return (
    // Suggested code may be subject to span license. Learn more: ~LicenseLog:1810907423.
    <>
      <div
        className={`md:p-4 p-2 md:mx-0 mx-2 fixed transition-all ease-in-out w-full  z-10 ${
          isScroll ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex md:flex-row justify-between items-center">
          <Link href="/">
            <h2
              className={`${
                isScroll ? "text-black" : "text-zinc-200"
              } md:text-2xl text-lg font-bold`}
            >
             <span>Sneakers.co</span>
            </h2>
          </Link>
          {/* hamburgerMenu */}
          <div className="flex flex-row-reverse md:flex-row md:items-center md:space-x-4">
          <div className="md:hidden ml-40">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="tegray-400 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    !isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"
                  }
                ></path>
              </svg>
            </button>
          </div>
          <ul
            className={`md:flex md:items-center md:space-x-6 ${
              isOpen ? "ml-0" : "ml-[-550px]"
            } absolute md:relative md:ml-2 ml-0 w-60 h-screen md:h-auto md:w-auto bg-slate-50 md:bg-transparent transition-all ease-in-out left-0 top-full md:top-auto`}
          >
            <li>
              <Link href="/shop">
                <span
                  className={`block px-4 py-2 ${
                    isScroll ? "text-black" : "md:text-zinc-200 text-slate-400"
                  }`}
                >
                  Shop
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span
                  className={`block px-4 py-2 ${
                    isScroll ? "text-black" : "md:text-zinc-200  text-slate-400"
                  }`}
                >
                  About
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span
                  className={`block px-4 py-2 ${
                    isScroll ? "text-black" : "md:text-zinc-200 text-slate-400"
                  }`}
                >
                  Contact
                </span>
              </Link>
            </li>
          </ul>
            <div className="flex flex-row gap-4 justify-center items-center">
              <CartProduct/>
              {/* avatar login */}
              {isLogin ? 
              <DropdownMenu>
              <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/order"> My Order</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={logoutUser}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> 
            : <div className="hidden md:block">
            <CustomButton title="Login" onClick={() => router.push('/auth/sign-in')} style="text-white bg-black p-3 rounded-md font-bold" />
         </div>}
            </div>
        </div>
        </div>
        </div>
      </>
  );
};

export default Navbar;
