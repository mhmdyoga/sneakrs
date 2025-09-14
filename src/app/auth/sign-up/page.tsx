"use client"
import { useToast } from '@/components/ui/use-toast';
import { Globalapi } from '@/components/utils/GlobalApi';
import { registerSchema, RegisterSchemaType } from '@/components/utils/schema/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod';


const SignUp = () => {
    const { toast } = useToast();
    const router = useRouter();
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<RegisterSchemaType>({
      resolver: zodResolver(registerSchema),
      mode: 'onChange'
    });
  
    const onSubmit = async(data: RegisterSchemaType) => {
      try {
        const response = await Globalapi.RegisterUser({
          name: data.name.trim(),
          email: data.email.trim(),
          password: data.password.trim()
        });
         toast({
        title: "Success",
        description: `${response.data?.massage} 🎉`,
        variant: "default"
      })
      console.log(response.data.massage);
       router.push('/auth/sign-in')
      } catch (error) {
        if(error instanceof z.ZodError){
         toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
        }
        console.log('register error:',error)
      }
    }

  
  return (
  <div className="px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-24">
  <section className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      {/* Banner Image */}
      <aside className="relative hidden lg:block lg:order-last lg:col-span-5 xl:col-span-6">
        <Image
          alt="Sneakers Banner"
          src="/banner-promo-shoe.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          width={800}
          height={800}
          priority
        />
      </aside>

      {/* Main Form */}
      <main className="flex items-center justify-center px-6 py-10 sm:px-8 md:px-12 lg:col-span-7 lg:py-16 xl:col-span-6">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl">
          {/* Logo */}
          <Link
            className="block font-bold text-2xl text-yellow-500 text-center lg:text-left"
            href="/"
          >
            Sneakers.co
          </Link>

          {/* Heading */}
          <h1 className="mt-6 text-2xl font-bold text-slate-50 sm:text-3xl text-center lg:text-left">
            Create your account <span className="text-slate-200">🚀</span>
          </h1>

          <p className="mt-3 text-center lg:text-left leading-relaxed text-slate-400">
            Join us and start shopping your favorite sneakers today.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-6"
          >
            {/* Full Name */}
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-400"
              >
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className="mt-1 w-full h-11 px-3 rounded-md outline-none border border-gray-300 bg-slate-100 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-yellow-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-400"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="mt-1 w-full h-11 px-3 rounded-md outline-none border border-gray-300 bg-slate-100 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-yellow-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-400"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="mt-1 w-full h-11 px-3 rounded-md outline-none border border-gray-300 bg-slate-100 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-yellow-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="sm:col-span-6">
              <p className="text-sm text-slate-400 text-center lg:text-left">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-slate-300 underline">
                  terms and conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-slate-300 underline">
                  privacy policy
                </a>
                .
              </p>
            </div>

            {/* Submit */}
            <div className="sm:col-span-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-slate-400 px-8 py-3 rounded-md font-semibold text-gray-300 cursor-not-allowed"
                    : "rounded-md border border-yellow-600 bg-yellow-600 px-8 py-3 text-sm font-bold text-slate-50 transition hover:bg-transparent hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                }`}
              >
                {isSubmitting ? "Creating..." : "Create an account"}
              </button>

              <p className="mt-4 sm:mt-0 text-center sm:text-left text-sm text-gray-500">
                Already have an account?
                <Link
                  href="/auth/sign-in"
                  className="text-slate-300 ml-2 underline"
                >
                  Sign in
                </Link>
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

export default SignUp