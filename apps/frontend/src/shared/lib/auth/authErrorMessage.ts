import type { ApiError } from '@/shared/api';

type AuthMode = 'login' | 'register';

const hasCyrillic = (text: string) => /[А-Яа-яЁё]/.test(text);

export function getAuthErrorMessage(error: unknown, mode: AuthMode): string {
  const fallbackMessage =
    mode === 'login'
      ? 'Не удалось войти. Проверьте email и пароль или зарегистрируйтесь, если аккаунта ещё нет.'
      : 'Не удалось зарегистрироваться. Проверьте данные и попробуйте снова.';

  if (typeof error === 'object' && error !== null && 'statusCode' in error && 'message' in error) {
    const apiError = error as ApiError;
    const normalizedMessage = apiError.message.trim().toLowerCase();

    if (mode === 'login') {
      if (apiError.statusCode === 401 || apiError.statusCode === 403) {
        return 'Неверный пароль или email. Если аккаунта нет, сначала зарегистрируйтесь.';
      }

      if (apiError.statusCode === 404) {
        return 'Аккаунт не найден. Сначала зарегистрируйтесь.';
      }
    }

    if (mode === 'register') {
      if (apiError.statusCode === 409) {
        return 'Аккаунт с таким email уже существует. Войдите в систему или используйте другой email.';
      }

      if (apiError.statusCode === 400 || apiError.statusCode === 422) {
        if (normalizedMessage.includes('password') || normalizedMessage.includes('парол')) {
          return apiError.message;
        }
      }
    }

    if (apiError.message && hasCyrillic(apiError.message)) {
      return apiError.message;
    }
  }

  if (error instanceof Error && error.message) {
    const normalizedMessage = error.message.trim().toLowerCase();

    if (normalizedMessage.includes('network error') || normalizedMessage.includes('failed to fetch')) {
      return 'Сервер временно недоступен. Проверьте подключение и попробуйте снова.';
    }

    if (hasCyrillic(error.message)) {
      return error.message;
    }
  }

  return fallbackMessage;
}
