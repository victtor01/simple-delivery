"use server";

import { NEXT_SECRET_KEY } from "@/config/constants";
import { useSession } from "@/hooks/useSession";
import * as jose from "jose";
import { cookies } from "next/headers";

interface createTokenProps {
  payload: any;
  tokenExpiration?: string;
}

export const createToken = async ({
  tokenExpiration = "7d",
  payload = {},
}: createTokenProps): Promise<string> => {
  const { getCookieRefreshToken } = useSession();

  // Get refresh token and test
  const _refresh_token = getCookieRefreshToken();
  if (!_refresh_token) throw new Error("houve um erro interno");

  // Create secret key composition
  const composition: string = `${NEXT_SECRET_KEY}${_refresh_token}`;

  const secret = new TextEncoder().encode(composition);

  return await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(tokenExpiration)
    .sign(secret);
};
