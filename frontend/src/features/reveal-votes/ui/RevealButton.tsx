import { Button } from '@/shared/ui';
import { useRevealVotes } from '../lib/useRevealVotes';

interface RevealButtonProps {
  roomId: string;
  disabled?: boolean;
}

export function RevealButton({ roomId, disabled }: RevealButtonProps) {
  const { mutate, isPending } = useRevealVotes(roomId);

  return (
    <Button onClick={() => mutate()} disabled={disabled || isPending} variant="primary">
      {isPending ? 'Revealing...' : 'Reveal Votes'}
    </Button>
  );
}
