import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@/shared/ui';
import { roomApi } from '@/entities/room';
import styles from './CreateRoomForm.module.css';

export function CreateRoomForm() {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: () => roomApi.createRoom(name),
    onSuccess: (room) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      navigate(`/room/${room.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createMutation.mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Room Name"
        placeholder="Enter room name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={createMutation.isPending}
      />
      <Button type="submit" disabled={createMutation.isPending || !name.trim()}>
        {createMutation.isPending ? 'Creating...' : 'Create Room'}
      </Button>
    </form>
  );
}
