import { api } from '@/shared/api';
import type { RoomState, RoomDetails } from '../model/types';

export const roomApi = {
  getRoom: async (roomId: string): Promise<RoomDetails> => {
    const { data } = await api.get(`/rooms/${roomId}`);
    return data;
  },

  createRoom: async (name: string): Promise<RoomDetails> => {
    const { data } = await api.post('/rooms', { name });
    return data;
  },

  updateRoomStatus: async (roomId: string, status: RoomState['status']): Promise<RoomDetails> => {
    const { data } = await api.patch(`/rooms/${roomId}/status`, { status });
    return data;
  },

  resetRoom: async (roomId: string): Promise<RoomDetails> => {
    const { data } = await api.post(`/rooms/${roomId}/reset`);
    return data;
  },
};
