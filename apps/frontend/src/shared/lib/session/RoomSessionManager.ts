import { SESSION_STORAGE_KEY, type GameSession } from '@/shared/lib/poker';

const ROOM_SESSION_CHANGE_EVENT = 'poker-planning:room-session-change';

type RoomSessionChangeDetail = {
  session?: GameSession | null;
};

function notifyRoomSessionChange(detail: RoomSessionChangeDetail = {}) {
  window.dispatchEvent(new CustomEvent(ROOM_SESSION_CHANGE_EVENT, { detail }));
}

export const RoomSessionManager = {
  getSession: (): GameSession | null => {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as GameSession;
    } catch {
      return null;
    }
  },

  saveSession: (session: GameSession) => {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    notifyRoomSessionChange({ session });
  },

  removeSession: () => {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    notifyRoomSessionChange({ session: null });
  },

  ROOM_SESSION_CHANGE_EVENT,
};

export default RoomSessionManager;
