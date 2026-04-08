import { getInitials } from '../model/selectors';
import type { Participant } from '../model/types';
import styles from './ParticipantCard.module.css';

interface ParticipantCardProps {
  participant: Participant;
  showVoteStatus?: boolean;
}

export function ParticipantCard({ participant, showVoteStatus = true }: ParticipantCardProps) {
  const initials = getInitials(participant.name);

  return (
    <li className={styles.card}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.info}>
        <span className={styles.name}>{participant.name}</span>
        {showVoteStatus && (
          <span
            className={`${styles.status} ${participant.hasVoted ? styles.voted : styles.pending}`}
          >
            {participant.hasVoted ? '✓ Voted' : 'Pending'}
          </span>
        )}
      </div>
    </li>
  );
}
