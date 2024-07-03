import { NextRequest, NextResponse } from "next/server";
import { useSession } from "./hooks/use-session";

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

const publicRoutes = ["/"];
const parsePublic = ["/login", "/register", /^\/store\/.*/];

export async function middleware(req: NextRequest) {
  const pathname: string = req.nextUrl.pathname;

  // Verifica se a rota é pública
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    parsePublic.some((route) =>
      typeof route === "string" ? route === pathname : route.test(pathname)
    );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Verifica a sessão
  const session = useSession();
  const validSession = await session.isSessionValid();

  if (!validSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
