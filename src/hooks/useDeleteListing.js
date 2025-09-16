// src/hooks/useDeleteListing.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';

export function useDeleteListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => (await api.delete(`/listings/${id}`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-listings'] }),
  });
}
