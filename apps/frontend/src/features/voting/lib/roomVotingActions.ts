import type { Task } from '@/shared/lib/poker';
import type { RoomSnapshot } from '@/entities/room/model/types';

interface HandleSelectCardActionParams {
  card: string;
  activeTask: Task | null;
  isBusy: boolean;
  snapshot: RoomSnapshot;
  isOwner: boolean;
  startRound: (taskId: string) => Promise<RoomSnapshot>;
  vote: (payload: { roundId: string; value: string }) => Promise<unknown>;
}

export async function handleSelectCardAction({
  card,
  activeTask,
  isBusy,
  snapshot,
  isOwner,
  startRound,
  vote,
}: HandleSelectCardActionParams): Promise<void> {
  if (!activeTask || isBusy) {
    return;
  }

  const activeRound = snapshot.active_round;

  if (!activeRound) {
    if (!isOwner) {
      return;
    }

    const startedSnapshot = await startRound(activeTask.id);
    if (!startedSnapshot.active_round) {
      return;
    }

    await vote({
      roundId: startedSnapshot.active_round.id,
      value: card,
    });
    return;
  }

  if (activeRound.status !== 'voting') {
    return;
  }

  await vote({
    roundId: activeRound.id,
    value: card,
  });
}

interface HandleRevealActionParams {
  snapshot: RoomSnapshot;
  isOwner: boolean;
  isBusy: boolean;
  revealRound: (roundId: string) => Promise<unknown>;
}

export async function handleRevealAction({
  snapshot,
  isOwner,
  isBusy,
  revealRound,
}: HandleRevealActionParams): Promise<void> {
  if (!isOwner || !snapshot.active_round || snapshot.active_round.status !== 'voting' || isBusy) {
    return;
  }

  await revealRound(snapshot.active_round.id);
}
