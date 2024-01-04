import { NextResponse, NextRequest } from "next/server";
import { setCookie, hasCookie, deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import { fetchApi } from "@/lib/http";
import { authApi } from "@/lib/authApi";

//post route
export async function POST(request: NextRequest) {
  console.log("signout called");

  const timestamp = new Date().getTime();

  //call the api
  const { data: apiData, status: apiStatus } = await authApi(
    `/auth/logout?timestamp=${timestamp}`,
    {
      method: "POST",
    }
  );

  //if the status is not ok
  if (![201, 200].includes(apiStatus)) {
    return NextResponse.json({ error: apiData?.error }, { status: 400 });
  }

  //remove the cookie
  deleteCookie("andy_xcess", {
    cookies,
  });

  deleteCookie("andy_xcess_refresh", {
    cookies,
  });

  console.log("apiData", apiData);

  return NextResponse.json({ message: apiData, status: 201 });
}
