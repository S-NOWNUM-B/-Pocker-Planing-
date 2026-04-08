import { RoomHeader } from '@/widgets/RoomHeader';
import { ParticipantsList } from '@/widgets/ParticipantsList';
import { VotingCards } from '@/widgets/VotingCards';
import { RoomResults } from '@/widgets/RoomResults';
import { useRoomParams } from '../lib/useRoomParams';
import { Spinner } from '@/shared/ui';
import styles from './RoomPage.module.css';

// Placeholder data - will be replaced with actual API calls
const mockRoom = {
  id: '1',
  name: 'Planning Poker Room',
  status: 'voting' as const,
  participants: [
    { id: '1', name: 'John Doe', hasVoted: true },
    { id: '2', name: 'Jane Smith', hasVoted: false },
    { id: '3', name: 'Bob Johnson', hasVoted: true },
  ],
};

export function RoomPage() {
  const { roomId } = useRoomParams();

  // TODO: Replace with actual data fetching
  const isLoading = false;
  const room = mockRoom;

  if (isLoading) {
    return <Spinner size="lg" label="Loading room..." />;
  }

  return (
    <div className={styles.page}>
      <RoomHeader room={room} roomId={roomId} isModerator={true} />
      <main className={styles.main}>
        <ParticipantsList participants={room.participants} />
        {room.status === 'voting' && <VotingCards roomId={roomId} />}
        {room.status === 'revealed' && <RoomResults results={[]} />}
      </main>
    </div>
  );
}
