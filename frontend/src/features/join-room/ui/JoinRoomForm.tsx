import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@/shared/ui';
import styles from './JoinRoomForm.module.css';

export function JoinRoomForm() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Room ID"
        placeholder="Enter room ID..."
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <Button type="submit" disabled={!roomId.trim()}>
        Join Room
      </Button>
    </form>
  );
}
