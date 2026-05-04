/**
 * SessionManager — управление сессией пользователя в localStorage.
 *
 * Отвечает за:
 *  - Сохранение access_token после авторизации
 *  - Восстановление токена при загрузке приложения
 *  - Удаление токена при выходе
 *  - Проверку наличия авторизованного пользователя
 */

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';
const SESSION_CHANGE_EVENT = 'poker-planning:session-change';

type SessionChangeDetail = {
  user?: unknown;
};

function notifySessionChange(detail: SessionChangeDetail = {}) {
  window.dispatchEvent(new CustomEvent(SESSION_CHANGE_EVENT, { detail }));
}

export const SessionManager = {
  // Сохранить токен в localStorage
  saveToken: (token: string, user?: unknown) => {
    localStorage.setItem(TOKEN_KEY, token);
    try {
      if (typeof user !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    } catch {
      // ignore serialization errors
    }
    notifySessionChange({ user });
  },

  // Получить токен из localStorage
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Получить сохранённый профиль пользователя (если есть)
  getUser: (): unknown | null => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // Проверить, есть ли токен (т.е. авторизован ли пользователь)
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Удалить токен из localStorage (выход)
  removeToken: (options?: { notify?: boolean }) => {
    localStorage.removeItem(TOKEN_KEY);
    try {
      localStorage.removeItem(USER_KEY);
    } catch {}
    if (options?.notify !== false) {
      notifySessionChange({ user: null });
    }
  },

  // Событие для подписки на изменения сессии в UI
  SESSION_CHANGE_EVENT,
};
