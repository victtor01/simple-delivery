import { createToken } from "@/utils/createToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface IBodyProps {
  email: string;
}

export async function POST(req: Request) {
  const access_token: string | null =
    cookies().get("__access_token")?.value || null;
  const refresh_token: string | null =
    cookies().get("__refresh_token")?.value || null;

  if (!access_token || !refresh_token)
    throw new Error("não há passaports para sessão!");

  const body: IBodyProps = (await req.json()) || null;
  if (!body) throw new Error("corpo da requisição não está presente!");

  try {
    const SecureNextAuthJwt = await createToken({
      payload: body,
    });

    cookies().set("_secure-next-auth", SecureNextAuthJwt, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({
      error: "false",
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
