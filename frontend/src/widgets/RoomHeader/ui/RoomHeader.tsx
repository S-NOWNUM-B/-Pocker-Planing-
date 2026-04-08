import { RoomStatusBadge } from '@/entities/room';
import { RoomControls } from '@/features/manage-room';
import { RevealButton } from '@/features/reveal-votes';
import type { RoomState } from '@poker/shared';
import styles from './RoomHeader.module.css';

interface RoomHeaderProps {
  room: RoomState;
  roomId: string;
  isModerator?: boolean;
}

export function RoomHeader({ room, roomId, isModerator = false }: RoomHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.name}>{room.name}</h1>
        <RoomStatusBadge status={room.status} />
      </div>
      <div className={styles.actions}>
        {isModerator && room.status === 'voting' && <RevealButton roomId={roomId} />}
        {isModerator && room.status === 'revealed' && <RoomControls roomId={roomId} />}
      </div>
    </header>
  );
}
