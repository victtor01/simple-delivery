import { api } from "@/app/api";
import Cookies from "js-cookie";

interface UseApiPrivateProps {
  method: string;
  body?: any; // Faça o corpo opcional, já que nem todos os métodos podem precisar dele
}

const useApiPrivate = async (
  url: string,
  { method, body = {} }: UseApiPrivateProps
) => {
  if (!(method in api)) {
    throw new Error(`Método ${method} não é suportado pela API.`);
  }

  if (!url) {
    throw new Error("Erro ao tentar usar o hook apiPrivate");
  }

  try {
    // try request
    const { data } = await api({
      data: { ...body },
      method,
      url,
    });

    // its OK
    return { data };
  } catch (error: any) {
    console.log(error);

    try {
      // try refres token
      await api({
        method: "post",
        url: "/auth/refresh",
      });

      // try get data again
      return await api({
        data: { ...body },
        method,
        url,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao tentar novamente após atualizar o token");
    }
  }
};

export { useApiPrivate };
