/**
 * SessionManager — управление сессией пользователя в localStorage.
 *
 * Отвечает за:
 *  - Сохранение access_token после авторизации
 *  - Восстановление токена при загрузке приложения
 *  - Удаление токена при выходе
 *  - Проверку наличия авторизованного пользователя
 */
import type { User } from '@/entities/user';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export class SessionManager {
  /**
   * Сохранить сессию (токен + профиль пользователя)
   */
  static saveSession(token: string, user: User): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Получить сохранённый токен
   */
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Получить сохранённый профиль пользователя
   */
  static getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  /**
   * Проверить, авторизован ли пользователь
   */
  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Очистить сессию (при выходе)
   */
  static clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
