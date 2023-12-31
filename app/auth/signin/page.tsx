"use client";

// import * as React from 'react';

import { cn } from "@/lib/utils";
import { Icons } from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
// import * as z from 'zod';
import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from 'yup';
// import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

// interface UserAuthFormProps
//   extends React.HTMLAttributes<HTMLDivElement> {}

// const FormSchema = yup
//   .object({
//     username: yup
//       .string()
//       .required('Username is required.')
//       .min(3, 'Username must be at least 3 characters.')
//       .max(20, 'Username must be less than 20 characters.')
//       .transform((value) => {
//         return value.toLowerCase();
//       }),
//     password: yup
//       .string()
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
//         {
//           message: (
//             <div>
//               Password must contain at least one uppercase letter, one
//               lowercase letter, one number, and one special character
//               & 8 characters long.
//             </div>
//           ),
//         }
//       ),
//   })
//   .required();

// type FormData = yup.InferType<typeof FormSchema>;

// export function UserAuthForm() {
//   const { toast } = useToast();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   const [isPasswordVisible, setIsPasswordVisible] =
//     React.useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(FormSchema),
//   });

//   async function onSubmit(data: any) {
//     setIsLoading(true);

//     const res = await signIn('credentials', {
//       username: data.username,
//       password: data.password,
//       callbackUrl: '/andy',
//       redirect: false,
//     }).then((response) => {
//       if (response?.error) {
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 3000);
//       }

//       if (response?.ok) {
//         console.log('ok', response);
//         const returnUrl: string = response?.url as string | '/andy';

//         setTimeout(() => {
//           setIsLoading(false);
//         }, 3000);

//         router.push(returnUrl);
//       }
//     });
//   }

//   async function onGoogleSignIn() {
//     setIsLoading(true);
//     toast({
//       variant: 'default',
//       title: 'Google Sign In',
//       description: 'Redirecting to Google Sign In...',
//       duration: 5000,
//     });

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 5000);

//     const gUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google/google`;
//     const localurl = `${process.env.LOCAL_URL}`;
//     window.location.href = `${gUrl}?callbackUrl=${localurl}`;
//   }

//   return (

//   );
// }

import React from "react";

const Login = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const loginReq = await fetch("/api/authz/signin", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      cache: "no-cache",
    });

    const loginReqData = await loginReq.json();

    if (![200, 201].includes(loginReq.status)) {
      // setError(loginReqData?.error);
      console.log(loginReqData);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Sign In",
        description:
          loginReqData?.error?.email ||
          loginReqData?.error?.password ||
          "Something went wrong. Please try again.",
        duration: 5000,
      });
      return;
    }

    setIsLoading(false);

    if (loginReq.status === 200) {
      toast({
        variant: "default",
        title: "Sign In",
        description: "Redirecting to Dashboard...",
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);
    }
  }

  return (
    <div className={cn("grid gap-3 py-6")}>
      <form onSubmit={handleLogin}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              name="username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              style={{
                textTransform: "lowercase",
                letterSpacing: "0.05em",
                padding: "1.35em 0.95em",
              }}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              style={{
                letterSpacing: "0.05em",
                padding: "1.35em 0.95em",
              }}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex w-full justify-center gap-x-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-700 dark:bg-slate-950 dark:hover:bg-slate-900 text-white hover:text-white"
          onClick={() => {
            // onGoogleSignIn();
          }}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-6 h-6 w-6" />
          )}{" "}
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.apple className="mr-6 h-4 w-4" />
          )}{" "}
          Apple
        </Button>
      </div>
    </div>
  );
};

export default Login;
