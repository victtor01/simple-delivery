import { cookies } from "next/headers";
import * as jose from "jose";

const useSession = () => {
  const openSessionToken = async (token: string) => {
    const refresh = cookies().get("refresh_token")?.value;
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
    const refresh_token = cookies().get("refresh_token");

    if (!sessionCookie || !refresh_token) {
      return false;
    }

    const { value } = sessionCookie;

    const valide = await openSessionToken(value);

    console.log(valide);

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
      user: cookieJson,
    };
  };

  return {
    getAuthorization,
    isSessionValid,
    openSessionToken,
  };
};

export { useSession };
