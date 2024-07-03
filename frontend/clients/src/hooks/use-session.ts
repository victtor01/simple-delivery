import { cookies } from "next/headers";
import * as jose from "jose";

const useSession = () => {
  const openSessionToken = async (token: string) => {
    const refresh = cookies().get("__refresh_token")?.value;
    const env = process.env.SECRET_KEY;
    const str: string = `${env}${refresh}`;
    const secret = new TextEncoder().encode(str);

    try {
      const { payload } = await jose.jwtVerify(token, secret);

      return payload;
    } catch (error) {
      return { exp: null } as unknown as jose.JWTPayload;
    }
  };

  const isSessionValid = async () => {
    const sessionCookie = cookies().get("session");
    const refresh_token = cookies().get("__refresh_token");

    if (!sessionCookie || !refresh_token) return false;

    const { value } = sessionCookie;
    const valide = await openSessionToken(value);

    if (!valide?.email) {
      return false;
    }

    const exp = valide?.exp || " ";
    const currentDate = new Date().getTime();

    return (exp as number) * 1000 > currentDate;
  };

  const getAuthorization = async () => {
    // get cookie
    const cookie = cookies().get("session");

    const cookieJson = await openSessionToken(cookie?.value || "");

    return {
      client: cookieJson,
    };
  };

  return {
    getAuthorization,
    isSessionValid,
    openSessionToken,
  };
};

export { useSession };
