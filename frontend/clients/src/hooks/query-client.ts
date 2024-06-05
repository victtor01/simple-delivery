import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 5 minutos
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});
