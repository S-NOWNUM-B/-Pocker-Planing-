import { VOTE_LABELS } from '../model/types';
import type { VoteValue } from '@poker/shared';
import styles from './VoteDisplay.module.css';

interface VoteDisplayProps {
  value: VoteValue;
  size?: 'sm' | 'md' | 'lg';
  revealed?: boolean;
}

const sizeMap = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export function VoteDisplay({ value, size = 'md', revealed = true }: VoteDisplayProps) {
  const label = VOTE_LABELS[value];

  return (
    <div className={`${styles.vote} ${styles[sizeMap[size]]} ${!revealed ? styles.hidden : ''}`}>
      {revealed ? label : '?'}
    </div>
  );
}
