import { loginAsGuest } from '@/entities/user';
import { RoomSessionManager } from './RoomSessionManager';

export async function ensureRoomAccessToken(currentUser?: { name?: string } | null): Promise<{ token?: string; guestName?: string }> {
  if (currentUser) {
    return {};
  }

  const existing = RoomSessionManager.getSession();
  if (existing?.roomAccessToken) {
    return { token: existing.roomAccessToken, guestName: existing.userName };
  }

  try {
    const res = await loginAsGuest({ name: 'Гость' });
    return { token: res.access_token, guestName: res.user.name };
  } catch {
    throw new Error('Не удалось подготовить гостевую сессию. Проверьте подключение и попробуйте снова.');
  }
}

export default ensureRoomAccessToken;
