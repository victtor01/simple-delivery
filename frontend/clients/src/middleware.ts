import { NextRequest, NextResponse } from "next/server";
import { useSession } from "./hooks/use-session";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const publicRoutes = ["/"];
const parsePublic = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const pathname: string = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // valid session
  const session = useSession();
  const validSession: boolean = await session.isSessionValid();
  
  // when the session is valid but the user cannot access the public route
  if (parsePublic.includes(pathname) && validSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
