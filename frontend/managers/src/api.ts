import axios, { AxiosResponse } from "axios";


const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data || null;

    if(!data) return response;

    if(data?.redirect) {
      console.log('houve um redirecionamento')
      window.location.href = data.redirect;
    }

    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export { api };
