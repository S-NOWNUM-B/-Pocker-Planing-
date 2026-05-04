/**
 * Форма присоединения к комнате по ID.
 *
 * Поле ввода ID комнаты → переход на /room/:roomId.
 * Используется когда участник получает ссылку или код приглашения.
 *
 * В будущей реализации:
 *  - Валидация формата ID комнаты
 *  - Проверка существования комнаты через roomApi.getRoom()
 *  - Обработка ошибок (комната не найдена, уже завершена)
 */
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/app/providers';
import ensureRoomAccessToken from '@/shared/lib/session/ensureRoomAccess';
import { roomApi } from '@/entities/room';
import { Input, Button } from '@/shared/ui';
import { persistRoomSession } from '@/shared/lib/session/persistRoomSession';

export function JoinRoomForm() {
  const [roomId, setRoomId] = useState('');
  const { user } = useSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const ensureRoomAccessTokenLocal = async () => ensureRoomAccessToken(user);

  const joinMutation = useMutation({
    mutationFn: async (code: string) => {
      const roomAccess = await ensureRoomAccessTokenLocal();
      const snapshot = await roomApi.joinRoomByCode(code, roomAccess.token);
      return { snapshot, roomAccessToken: roomAccess.token, guestName: roomAccess.guestName };
    },
    onSuccess: ({ snapshot, roomAccessToken, guestName }) => {
      persistRoomSession({
        snapshot,
        authUserName: user?.name?.trim(),
        localUserName: guestName || 'Гость',
        roomAccessToken,
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      navigate(`/room/${snapshot.room.slug}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim() || joinMutation.isPending) {
      return;
    }

    joinMutation.mutate(roomId.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Код комнаты"
        placeholder="Например, ABCD"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value.toUpperCase())}
        maxLength={4}
        disabled={joinMutation.isPending}
      />
      <Button type="submit" disabled={!roomId.trim() || joinMutation.isPending}>
        {joinMutation.isPending ? 'Входим...' : 'Войти в комнату'}
      </Button>
      {joinMutation.isError && (
        <p className="text-sm text-destructive">
          {joinMutation.error instanceof Error
            ? joinMutation.error.message
            : 'Комната с таким кодом не найдена или недоступна.'}
        </p>
      )}
    </form>
  );
}
