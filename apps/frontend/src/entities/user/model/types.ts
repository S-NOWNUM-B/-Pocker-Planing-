/**
 * Типы данных сущности «Пользователь» и авторизации.
 *
 * User — профиль пользователя (id, email, name, avatar_color).
 * LoginCredentials / RegisterCredentials — данные для входа/регистрации.
 * AuthTokens — access токен от сервера.
 * LoginResponse / RegisterResponse — ответ сервера при авторизации.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_color: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterResponse {
  access_token: string;
  token_type: string;
  user: User;
}
