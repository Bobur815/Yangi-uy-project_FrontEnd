import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export function useMe() {
  const hasToken = !!localStorage.getItem('access_token');
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => (await api.get('/users/me')).data.data,
    enabled: hasToken,            
    retry: false,
  });
}

api.interceptors.response.use(
  r => r,
  err => {
    return Promise.reject(err);
  }
);
