import React from 'react';
import { Card } from '@/shared/ui';
import RoomOwnerCard from './RoomOwnerCard';
import { RoomResults, ParticipantsList } from '@/widgets';

interface Props {
  controller: any;
}

export function RoomMainContent({ controller }: Props) {
  return (
    <div className="grid min-w-0 min-h-0 gap-3 lg:grid-rows-[auto_minmax(0,1.8fr)_auto]">
      <RoomOwnerCard
        isOwner={controller.isOwner}
        currentUserName={controller.currentUserName}
        roomOwnerName={controller.roomOwnerName}
      />

      <RoomResults
        activeTaskTitle={controller.activeTask ? controller.activeTask.title : null}
        scoreLabel={controller.scoreLabel}
        scoreTitle={controller.scoreTitle}
        scoreSubtitle={controller.scoreSubtitle}
        isRevealed={controller.isRevealed}
        allPlayersVoted={controller.allPlayersVoted}
        anyPlayerVoted={controller.anyPlayerVoted}
        onReveal={controller.handleReveal}
        onNextTask={controller.handleNextTask}
        onResetRound={controller.isOwner ? controller.handleResetRound : undefined}
        isLoading={controller.isBusy}
        className="h-auto min-h-48 lg:h-full"
      />

      <ParticipantsList
        players={controller.players}
        isRevealed={controller.isRevealed}
        className="self-start h-auto min-h-5.5rem"
      />
    </div>
  );
}

export default RoomMainContent;
