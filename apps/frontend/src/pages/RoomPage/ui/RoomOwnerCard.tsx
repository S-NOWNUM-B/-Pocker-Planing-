import React from 'react';
import { Card } from '@/shared/ui';

interface Props {
  isOwner: boolean;
  currentUserName: string;
  roomOwnerName: string;
}

export function RoomOwnerCard({ isOwner, currentUserName, roomOwnerName }: Props) {
  return (
    <Card className="border border-border/70 bg-card/90 p-3 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Создатель комнаты
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground">
            {isOwner ? currentUserName : roomOwnerName}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default RoomOwnerCard;
