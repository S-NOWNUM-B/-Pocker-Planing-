import { Card } from '@/shared/ui';
import { CreateRoomForm } from '@/features/create-room';
import { JoinRoomForm } from '@/features/join-room';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Planning Poker</h1>
          <p className={styles.subtitle}>Estimate your tasks efficiently with your team</p>
        </div>
        <div className={styles.forms}>
          <Card className={styles.card}>
            <h2 className={styles['card-title']}>Create New Room</h2>
            <CreateRoomForm />
          </Card>
          <Card className={styles.card}>
            <h2 className={styles['card-title']}>Join Existing Room</h2>
            <JoinRoomForm />
          </Card>
        </div>
      </main>
    </div>
  );
}
