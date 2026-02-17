// app/api/auth/[...auth]/route.ts
import { ROUTES } from "@/constants";
import {
  API_FACEBOOK_LOGIN_REDIRECT,
  API_GOOGLE_LOGIN_REDIRECT,
} from "@/constants/api/auth";
import { redirectMap, USER_COOKIE_KEY } from "@/constants/auth";
import { setCookie } from "@/lib/utils/cookieUtils";
import { LoginResponse, User } from "@/types/auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// Configuration for different providers
type ProvidersType = "google" | "facebook";

const PROVIDERS: Record<ProvidersType, string> = {
  google: API_GOOGLE_LOGIN_REDIRECT,
  facebook: API_FACEBOOK_LOGIN_REDIRECT,
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nextauth: string[] }> }, // 1. Define as a Promise
) {
  // 2. Await the params before using them
  const { nextauth } = await params;

  // 3. Now you can safely destructure the array
  const [provider, action] = nextauth as [ProvidersType, string];
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (action !== "redirect" || !code) {
    return redirect(`${ROUTES.LOGIN}?error=invalid_request`);
  }

  const providerUrl = PROVIDERS[provider];
  if (!providerUrl) {
    return NextResponse.json(
      { error: "Provider not supported" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(providerUrl + `?code=${code}&state=${state}`);
    const result: LoginResponse = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        result?.message || "Something went wrong. Please try again.";

      throw new Error(errorMessage);
    }

    // 🟢 Success validation
    if (!result?.access_token || !result?.user) {
      throw new Error("Invalid server response.");
    }

    const user: User = {
      ...result.user,
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    };

    await setCookie(USER_COOKIE_KEY, user);
    const url = redirectMap[user.role];
    return redirect(url);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error occurred.";
    return redirect(
      `${ROUTES.LOGIN}?error=${encodeURIComponent(errorMessage)}`,
    );
  }
}
