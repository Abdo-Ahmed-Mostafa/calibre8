// src/app/api/profile/route.ts

// import { refreshToken } from "@/utils/refresh-token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  let token = cookieStore.get("token")?.value;

  if (!token) {
    if (!cookieStore.get("refreshToken")?.value) {
      return NextResponse.json(
        { message: "No user logged in" },
        { status: 200 }
      );
    }
    // Optional: If you have a refresh token
    // get the new token and set it.
    // const newTokenData = await refreshToken();
    // if (!newTokenData) {
    //   cookieStore.delete("token");
    //   cookieStore.delete("refreshToken");
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }

    // token = newTokenData.token;
    // cookieStore.set("token", newTokenData.token, {
    //   path: "/",
    //   expires: new Date(newTokenData.expires),
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    // });
  }

  try {
    // get the user profile from the external backend with the token
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/auth/profile",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = await res.json();
    // return the user, and token to the client to set them in state
    return NextResponse.json({ user: data, token }, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
