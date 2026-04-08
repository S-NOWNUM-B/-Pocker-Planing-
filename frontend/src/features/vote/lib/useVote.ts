import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import type { VoteValue } from '@poker/shared';

export function useVote(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vote: VoteValue) => {
      const { data } = await api.post(`/rooms/${roomId}/vote`, { vote });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
  });
}
