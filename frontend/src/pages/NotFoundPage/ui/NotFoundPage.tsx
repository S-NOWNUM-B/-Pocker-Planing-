import { Link } from 'react-router-dom';
import { Button, EmptyState } from '@/shared/ui';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <EmptyState
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist"
        actionLabel="Go Home"
        onAction={() => {}}
      />
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
