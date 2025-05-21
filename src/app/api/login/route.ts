import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("🔥 login route reached");

  const payload = await request.json();
  // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`, {
  //   credentials: "include",
  // });

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/auth/login/website",

      {
        method: "POST",
        // credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const json = await res.json();

    if (res.ok) {
      const response = NextResponse.json(json, { status: res.status });

      console.log("jsonjsonjson", json);

      response.cookies.set("token", json.data.token, {
        path: "/",
        expires: new Date(json.data.token_expires_at),
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      response.cookies.set("refreshToken", json.data.refresh_token, {
        path: "/",
        expires: new Date(json.data.refresh_token_expires_at),
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      return response;
    }

    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    console.log("Error logging in:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
