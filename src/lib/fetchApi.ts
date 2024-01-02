import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
async function refreshToken(refreshToken: string) {
  const res = await fetch(BASE_URL + "/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  const data = await res.json();
  console.log({ data });

  return data.accessToken;
}

export async function AuthGetApi(url: string) {
  const session = await getServerSession(authOptions);
  console.log("before: ", session?.accessToken);

  let res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status == 401) {
    if (session)
      session.accessToken = await refreshToken(session?.refreshToken ?? "");
    console.log("after: ", session?.accessToken);

    res = await fetch(BASE_URL + url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }

  return await res.json();
}
