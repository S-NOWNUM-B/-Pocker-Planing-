/**
 * Типы данных сущности «Пользователь» и авторизации.
 *
 * User — профиль пользователя (id, email, name, avatar_color).
 * LoginCredentials / RegisterCredentials — данные для входа/регистрации.
 * AuthTokens — access токен от сервера.
 * LoginResponse / RegisterResponse — ответ сервера при авторизации.
 */

export interface IUser {
  id: string;
  email: string;
  username: string;
  avatarColor?: string;
  createdAt: string;
}

export interface ILoginCredentails {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  email: string;
  username: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}

export interface IRegisterResponse {
  user: IUser;
  accessToken: string;
}
