import { VoteDisplay } from '@/entities/vote';
import { Card, EmptyState } from '@/shared/ui';
import type { VoteValue } from '@poker/shared';
import styles from './RoomResults.module.css';

interface VoteResult {
  participantName: string;
  vote: VoteValue;
}

interface RoomResultsProps {
  results: VoteResult[];
  average?: number;
}

export function RoomResults({ results, average }: RoomResultsProps) {
  if (results.length === 0) {
    return (
      <EmptyState title="No votes to display" description="Waiting for participants to vote" />
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Results</h2>
        {average !== undefined && (
          <div className={styles.average}>
            <span className={styles.averageLabel}>Average:</span>
            <span className={styles.averageValue}>{average.toFixed(1)}</span>
          </div>
        )}
      </div>
      <Card className={styles.results}>
        <div className={styles.grid}>
          {results.map((result, index) => (
            <div key={index} className={styles.result}>
              <VoteDisplay value={result.vote} size="sm" revealed />
              <span className={styles.name}>{result.participantName}</span>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
