import { ParticipantCard, sortParticipants } from '@/entities/participant';
import { EmptyState } from '@/shared/ui';
import type { Participant } from '@poker/shared';
import styles from './ParticipantsList.module.css';

interface ParticipantsListProps {
  participants: Participant[];
}

export function ParticipantsList({ participants }: ParticipantsListProps) {
  if (participants.length === 0) {
    return (
      <EmptyState title="No participants yet" description="Share the room ID to invite others" />
    );
  }

  const sortedParticipants = [...participants].sort(sortParticipants);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Participants ({participants.length})</h2>
      <ul className={styles.list}>
        {sortedParticipants.map((participant) => (
          <ParticipantCard key={participant.id} participant={participant} />
        ))}
      </ul>
    </section>
  );
}
