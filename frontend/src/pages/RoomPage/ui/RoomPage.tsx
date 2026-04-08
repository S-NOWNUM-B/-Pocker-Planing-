import { RoomHeader } from '@/widgets/RoomHeader';
import { ParticipantsList } from '@/widgets/ParticipantsList';
import { VotingCards } from '@/widgets/VotingCards';
import { RoomResults } from '@/widgets/RoomResults';
import { useRoomParams } from '../lib/useRoomParams';
import { Spinner } from '@/shared/ui';

import type { RoomStatus } from '@poker/shared';

// Placeholder data - will be replaced with actual API calls
const mockRoom: {
  id: string;
  name: string;
  status: RoomStatus;
  participants: Array<{ id: string; name: string; hasVoted: boolean }>;
} = {
  id: '1',
  name: 'Planning Poker Room',
  status: 'voting',
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
    <div className="min-h-screen bg-gray-50">
      <RoomHeader room={room} roomId={roomId} isModerator={true} />
      <main className="max-w-1200px mx-auto p-5 flex flex-col gap-6">
        <ParticipantsList participants={room.participants} />
        {room.status === 'voting' && <VotingCards roomId={roomId} />}
        {room.status === 'revealed' && <RoomResults results={[]} />}
      </main>
    </div>
  );
}
