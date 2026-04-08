import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';

export function useResetRoom(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/rooms/${roomId}/reset`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
    },
  });
}
