"use client"
import { useToast } from '@/components/ui/use-toast'
import { Globalapi } from '@/components/utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginSchemaType } from '@/components/utils/schema/zodSchema'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setToken } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  })

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await Globalapi.LoginUser({
        email: data.email.trim(),
        password: data.password.trim()
      });
      // notify success
      toast({
        title: "Success",
        description: `${response.data?.message} 🎉`,
        variant: "default"
      })
      setToken(response.data?.token);
      router.push('/');
    } catch (error) {

      if(error instanceof z.ZodError){
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
      }
      toast({
        title: `${(error as any).response?.data?.message}`,
        variant: "destructive"
      });
    }
  }

  return (
   <div className="px-4 sm:px-6 lg:px-16 py-8">
  <section className="bg-slate-800 rounded-xl shadow-xl overflow-hidden">
    <div className="grid lg:min-h-screen lg:grid-cols-12">
      
      {/* IMAGE ASIDE */}
      <aside className="relative hidden lg:block lg:order-last lg:col-span-5 xl:col-span-6">
        <Image
          alt="Banner Sneakers"
          src="/banner-promo-shoe.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          width={800}
          height={800}
          priority
        />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex items-center justify-center px-4 py-8 sm:px-8 md:px-12 lg:col-span-7 xl:col-span-6">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          
          {/* BRAND */}
          <Link href="/auth/login" className="block font-bold text-2xl sm:text-3xl text-yellow-500">
            Sneakers.co
          </Link>

          {/* TITLE */}
          <h1 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-slate-50">
            Welcome to Sneakers.co <span className="text-slate-200">!</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Please login to your account to start shopping
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            
            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400"> Email </label>
              <input
                type="text"
                {...register("email")}
                className="mt-1 w-full rounded-md border-gray-200 bg-slate-100 px-3 py-2 text-sm text-gray-700 shadow focus:border-yellow-500 focus:ring focus:ring-yellow-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-400"> Password </label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 w-full rounded-md border-gray-200 bg-slate-100 px-3 py-2 text-sm text-gray-700 shadow focus:border-yellow-500 focus:ring focus:ring-yellow-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* TERMS */}
            <p className="text-xs sm:text-sm text-slate-400">
              By logging in, you agree to our{" "}
              <a href="#" className="text-slate-300 underline">terms</a> and{" "}
              <a href="#" className="text-slate-300 underline">privacy policy</a>.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={isSubmitting
                  ? "w-full sm:w-auto bg-slate-400 px-8 py-3 text-sm font-medium text-gray-300 rounded-md shadow cursor-not-allowed"
                  : "w-full sm:w-auto bg-yellow-600 px-8 py-3 text-sm font-bold text-slate-50 rounded-md shadow hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 transition"
                }
              >
                {isSubmitting ? "Loading..." : "Sign In"}
              </button>

              <p className="text-xs sm:text-sm text-gray-400">
                Don’t have an account?{" "}
                <Link href="/auth/sign-up" className="text-slate-300 underline">Sign up</Link>
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