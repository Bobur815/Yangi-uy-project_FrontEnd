// src/hooks/useToggleListingStatus.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';

export function useToggleListingStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) =>
      (await api.patch(`/listings/${id}`, { status })).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['my-listings'] }),
  });
}
