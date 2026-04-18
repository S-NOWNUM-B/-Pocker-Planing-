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

export const SessionManager = {
  // Сохранить токен в localStorage
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Получить токен из localStorage
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Проверить, есть ли токен (т.е. авторизован ли пользователь)
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Удалить токен из localStorage (выход)
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
};
