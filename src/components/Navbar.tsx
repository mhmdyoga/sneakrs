"use client";
import Link from "next/link";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import React, { useEffect, useState } from "react";
import CustomButton from "./fragment/CustomButton";
import { usePathname, useRouter } from "next/navigation";
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
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useToast } from "./ui/use-toast";
import { Globalapi } from "./utils/GlobalApi";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isLogin, setIslogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const auth = useAuth();
  const token = auth.token;
  const { toast } = useToast();
  const pathName = usePathname();

  // sticky header
  useEffect(() => {
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

  const isHome = pathName === "/";

   useEffect(() => {
  if (token) {
    try {
      const decode: any = jwtDecode(token);
      setUserName(decode.name || "");
      setIslogin(true);
      localStorage.setItem("isLogin", "true"); 
      localStorage.setItem("name", decode.name || ""); // langsung dari decode
    } catch (err) {
      console.error("Error decode token", err);
    }
  } else {
    // logout → clear storage
    localStorage.removeItem("isLogin");
    localStorage.removeItem("name");
    setIslogin(false);
    setUserName("");
  }
}, [token]);


  const handleLogout = async () => {
    try {
      const response = await Globalapi.LogoutUser();
      toast({
        title: "Success",
        description: response.data.message,
        variant: "default",
      });

      // clear state + status
      localStorage.setItem("isLogin", "false");
      setIslogin(false);
      setUserName("");

      router.push("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`md:p-4 p-0 md:mx-0 fixed transition-all ease-in-out w-full z-10 ${
          isScroll || !isHome ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex md:flex-row justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <h2
              className={`${
                isScroll || !isHome ? "text-black" : "text-zinc-200"
              } md:text-2xl text-lg font-bold`}
            >
              <span>Sneakers.co</span>
            </h2>
          </Link>

          {/* Right section */}
          <div className="flex flex-row-reverse md:flex-row md:items-center md:space-x-4">
            {/* === Mobile Only (xs) : Cart + Hamburger === */}
            <div className="flex items-center space-x-3 sm:hidden">
              <CartProduct />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
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
                      !isOpen
                        ? "M4 6h16M4 12h16M4 18h16"
                        : "M6 18L18 6M6 6l12 12"
                    }
                  ></path>
                </svg>
              </button>
            </div>

            {/* === Mobile Nav Menu (xs) === */}
            <ul
              className={`sm:hidden ${
                isOpen ? "ml-0" : "ml-[-550px]"
              } absolute md:relative md:ml-2 ml-0 w-60 h-screen md:h-auto md:w-auto bg-slate-50 md:bg-transparent transition-all ease-in-out left-0 top-full md:top-auto`}
            >
              <li>
                <Link href="/shop">
                  <span
                    className={`block px-4 py-2 font-semibold ${
                      isScroll || !isHome
                        ? "text-black"
                        : "md:text-zinc-200 text-slate-400"
                    }`}
                  >
                    Shop
                  </span>
                </Link>
              </li>

              {/* Mobile: Avatar/Login */}
              <li className="flex items-start justify-start px-4 py-2 sm:hidden">
                {isLogin ? (
                  <div className="flex flex-row gap-2 justify-center items-center">
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
                          <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button
                            variant={"destructive"}
                            className="w-full h-auto"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <h4
                      className={`text-sm font-semibold ${
                        isScroll || !isHome ? `text-black` : `text-[#111]`
                      }`}
                    >
                      {userName}
                    </h4>
                  </div>
                ) : (
                  <div className="block sm:hidden">
                    <CustomButton
                      title="Login"
                      onClick={() => router.push("/auth/sign-in")}
                      style="text-white bg-black p-3 rounded-md font-bold"
                    />
                  </div>
                )}
              </li>
            </ul>

            {/* === Desktop Only (≥sm) : Shop | Cart | Avatar === */}
            <div className="hidden sm:flex flex-row gap-4 justify-center items-center">
              <Link href="/shop">
                <span
                  className={`block px-4 py-2 font-semibold ${
                    isScroll || !isHome ? "text-black" : "text-zinc-200"
                  }`}
                >
                  Shop
                </span>
              </Link>

              <CartProduct />

              {isLogin ? (
                <div className="flex flex-row gap-2 justify-center items-center">
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
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          variant={"destructive"}
                          className="w-full h-auto"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <h4
                    className={`text-sm font-semibold ${
                      isScroll || !isHome ? `text-black` : `text-white`
                    }`}
                  >
                    {userName}
                  </h4>
                </div>
              ) : (
                <CustomButton
                  title="Login"
                  onClick={() => router.push("/auth/sign-in")}
                  style="text-white bg-black p-3 rounded-md font-bold"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
