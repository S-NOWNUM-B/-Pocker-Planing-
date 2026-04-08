import { VoteButton } from '@/features/vote';
import { Card } from '@/shared/ui';
import type { VoteValue } from '@poker/shared';
import styles from './VotingCards.module.css';

const VOTE_VALUES: VoteValue[] = ['0', '1/2', '1', '2', '3', '5', '8', '13', '21', '?', 'coffee'];

interface VotingCardsProps {
  roomId: string;
  disabled?: boolean;
}

export function VotingCards({ roomId, disabled = false }: VotingCardsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Cast Your Vote</h2>
      <Card className={styles.cards}>
        <div className={styles.grid}>
          {VOTE_VALUES.map((vote) => (
            <VoteButton key={vote} roomId={roomId} vote={vote} disabled={disabled} />
          ))}
        </div>
      </Card>
    </section>
  );
}
