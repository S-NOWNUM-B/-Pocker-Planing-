import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@/app/providers';
import { roomApi } from '@/entities/room';
import ensureRoomAccessToken from '@/shared/lib/session/ensureRoomAccess';
import { EmptyState, PageShell, Spinner } from '@/shared/ui';
import { persistRoomSession } from '@/shared/lib/session/persistRoomSession';

export function InvitePage() {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { user } = useSession();

  const ensureRoomAccessTokenLocal = async () => ensureRoomAccessToken(user);

  const joinMutation = useMutation({
    mutationFn: async (invitationToken: string) => {
      const roomAccess = await ensureRoomAccessTokenLocal();
      const snapshot = await roomApi.joinRoomByInvitation(invitationToken, roomAccess.token);
      return { snapshot, roomAccessToken: roomAccess.token, guestName: roomAccess.guestName };
    },
    onSuccess: ({ snapshot, roomAccessToken, guestName }) => {
      persistRoomSession({
        snapshot,
        authUserName: user?.name?.trim(),
        localUserName: guestName || 'Гость',
        roomAccessToken,
      });
      navigate(`/room/${snapshot.room.slug}`, { replace: true });
    },
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    joinMutation.mutate(token);
  }, [joinMutation, navigate, token]);

  if (!token) {
    return (
      <PageShell>
        <div className="flex items-center justify-center">
          <EmptyState
            title="Неверная ссылка приглашения"
            description="Ссылка не содержит токен комнаты. Попросите отправить приглашение ещё раз или перейдите к входу по коду."
            actionLabel="Перейти к входу"
            onAction={() => navigate('/join-room', { replace: true })}
          />
        </div>
      </PageShell>
    );
  }

  if (joinMutation.isError) {
    const errorMessage =
      joinMutation.error instanceof Error
        ? joinMutation.error.message
        : 'Похоже, ссылка уже недействительна или комната недоступна.';

    return (
      <PageShell>
        <div className="flex items-center justify-center">
          <EmptyState
            title="Не удалось открыть приглашение"
            description={`${errorMessage} Можно попробовать ещё раз либо перейти к входу по коду.`}
            actionLabel={joinMutation.isPending ? 'Повторяем...' : 'Попробовать снова'}
            onAction={() => joinMutation.mutate(token)}
          />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-muted-foreground">Подключаем к комнате по приглашению...</p>
        </div>
      </div>
    </PageShell>
  );
}
