import type { RoomState, RoomStatus } from '@poker/shared';

export type { RoomState, RoomStatus };

export interface RoomDetails extends RoomState {
  createdAt: string;
  moderatorId: string;
}
