"use client";
import { useSession } from "next-auth/react";
import React, { ReactNode, useLayoutEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loader from "@/components/custom/loader";
import { ScaleLoader } from "react-spinners";

interface Props {
  children: ReactNode;
}

const AuthRoutesProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  useLayoutEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router, pathName]);

  if (status === "authenticated") {
    //delay the loader for 3 seconds
    // setTimeout(() => {

    // }, 10000);
    return <div>{children}</div>;
  }

  return (
    <div className="h-screen w-screen bg-gray-700 flex justify-center items-center">
      <ScaleLoader color="#ffffff" />
    </div>
  );
};

export default AuthRoutesProvider;
