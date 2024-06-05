import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  // destroy session
  cookies().delete("access_token");
  cookies().delete("refresh_token");
  cookies().delete("session");

  return NextResponse.json({
    error: false,
  });
}
