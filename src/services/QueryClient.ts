import { QueryClient } from "@tanstack/react-query";

const config = {
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
};

const queryClient = new QueryClient(config);

export default queryClient;
