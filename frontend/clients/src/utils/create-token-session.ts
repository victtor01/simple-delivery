"use server";

import * as jose from "jose";
import { cookies } from "next/headers";

interface createTokenProps {
  payload: any;
  tokenExpiration?: string;
}

export const createToken = async ({
  payload = {},
  tokenExpiration = "1d",
}: createTokenProps): Promise<string> => {
  const refresh = cookies().get("refresh_token")?.value;
  const env = process.env.SECRET_KEY;
  const str: string = `${env}${refresh}`;

  if (!refresh) {
    throw new Error("houve um erro interno");
  }

  const secret = new TextEncoder().encode(str);

  return await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime(tokenExpiration)
    .sign(secret);
};
