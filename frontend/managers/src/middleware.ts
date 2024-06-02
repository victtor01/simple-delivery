import { NextRequest, NextResponse } from "next/server";
import { useSession } from "./hooks/useSession";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const publicRoutes = ["/"];
const parsePublic = ["/login", "/register"];
const apiPublic = ["/api/login"];

export async function middleware(req: NextRequest) {
  const pathname: string = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname) || apiPublic.includes(pathname))
    return NextResponse.next();

  // valid session
  const { isSessionValid } = useSession();

  const validSession: boolean = await isSessionValid();

  // when the session is valid but the user cannot access the public route
  if (parsePublic.includes(pathname) && validSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // when the session not is valid and the route is public
  if (parsePublic.includes(pathname) && !validSession) {
    return NextResponse.next();
  }

  if (!validSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
