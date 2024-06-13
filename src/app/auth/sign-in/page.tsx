"use client"
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:1337/api/auth/local", {
        identifier,
        password
      });
      localStorage.setItem('user', response.data.user);
      localStorage.setItem('token', response.data.jwt);
      toast({
        title: 'Login Successfully',
        description: "Happy Shopping!!!"
      })
      window.location.href = '/'
    } catch (error) {
      toast({ variant: "destructive", title: "Login Failed" });
    }
  }
  return (
    <div className='p-16 mx-14'>
    <section className="bg-slate-800">
<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
  <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
    <Image
      alt=""
      src="/banner-promo-shoe.jpg"
      className="absolute inset-0 h-full w-full object-cover"
      width={600}
    height={600}
    />
  </aside>

  <main
    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
  >
    <div className="max-w-xl lg:max-w-3xl">
      <Link className="block font-bold text-2xl text-yellow-500" href="/auth/login">
        <h2>Sneakers.co</h2>
      </Link>

      <h1 className="mt-6 text-2xl font-bold text-slate-50 sm:text-3xl md:text-3xl">
        Welcome to Sneakers.co  <span className="text-slate-200">!</span>
      </h1>

      <p className="mt-4 leading-relaxed text-slate-400">
        Please Login your account for shopping from Sneakers.co
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label htmlFor="Email" className="block text-sm font-medium text-slate-400"> Email </label>

          <input
            type="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 w-full h-10 outline-none  rounded-md border-gray-200 bg-slate-400 text-sm text-gray-700 shadow-xl"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="Password" className="block text-sm font-medium text-slate-400"> Password </label>

          <input
            type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full h-10 outline-none rounded-md border-gray-200 bg-slate-400 text-sm text-gray-700 shadow-xl"
          />
        </div>

        <div className="col-span-6">
          <p className="text-sm text-slate-400">
            By creating an account, you agree to our
            <a href="#" className="text-slate-300 underline"> terms and conditions </a>
            and
            <a href="#" className="text-slate-300 underline">privacy policy</a>.
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
          type="submit"
          disabled={!( identifier || password)}
            className={`${!( identifier || password) ? 'bg-slate-400 p-4 rounded-md inline-block shrink-0 border border-slate-400 text-gray-300' : 'inline-block shrink-0 rounded-md border border-yellow-600 bg-yellow-600 px-12 py-3 text-sm font-bold text-slate-50 transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'}`}
          >
            Create an account
          </button>

          <p className="mt-4 text-sm gap-2 text-gray-500 sm:mt-0">
            Already have an account?
            <Link href="/auth/sign-up" className="text-slate-300 ml-3 underline">Sign-up</Link>.
          </p>
        </div>
      </form>
    </div>
  </main>
</div>
</section>
  </div>
  )
}

export default SignIn