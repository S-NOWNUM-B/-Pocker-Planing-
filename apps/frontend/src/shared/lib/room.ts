import { roomApi } from '@/entities/room';
import type { RoomSnapshot } from '@/entities/room/model/types';
import { SESSION_STORAGE_KEY, type GameSession } from '@/shared/lib/poker';

export function toAverageLabel(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return '0';
  }

  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export function formatRoundScoreLabel(
  averageScore: number | null | undefined,
  fallbackLabel: string | null | undefined,
) {
  if (averageScore === null || averageScore === undefined) {
    return fallbackLabel ?? '—';
  }

  return `${toAverageLabel(averageScore)} SP`;
}

export function formatResultValueLabel(value: string) {
  return /^\d+(?:\.\d+)?$/.test(value) ? `${value} SP` : value;
}

export function roomRefLooksLikeCode(value: string) {
  return /^[a-zA-Z]{4}$/.test(value);
}

export function isRoomRoute(pathname: string) {
  return /^\/room\/[^/]+$/.test(pathname);
}

import { RoomSessionManager } from '@/shared/lib/session/RoomSessionManager';

export function getLocalSession(): GameSession | null {
  return RoomSessionManager.getSession();
}

export async function loadRoomSnapshotWithToken(
  roomRef: string,
  roomAccessToken?: string,
): Promise<RoomSnapshot> {
  try {
    if (roomRefLooksLikeCode(roomRef)) {
      return roomApi.joinRoomByCode(roomRef.toUpperCase(), roomAccessToken);
    }

    return await roomApi.getRoomSnapshot(roomRef, roomAccessToken);
  } catch {

    throw new Error('room_not_available');
  }
}
