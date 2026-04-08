import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';

export function useRevealVotes(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/rooms/${roomId}/reveal`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
  });
}
