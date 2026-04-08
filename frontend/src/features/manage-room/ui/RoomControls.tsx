import { Button } from '@/shared/ui';
import { useResetRoom } from '../lib/useResetRoom';

interface RoomControlsProps {
  roomId: string;
  variant?: 'primary' | 'outline';
}

export function RoomControls({ roomId, variant = 'outline' }: RoomControlsProps) {
  const { mutate, isPending } = useResetRoom(roomId);

  return (
    <Button onClick={() => mutate()} disabled={isPending} variant={variant} size="sm">
      {isPending ? 'Resetting...' : 'Reset Room'}
    </Button>
  );
}
