import { api } from '@/shared/api';
import type {
  IGuestLoginCredentials,
  IGuestLoginResponse,
  ILoginCredentails,
  ILoginResponse,
  IRegisterCredentials,
  IRegisterResponse,
  IUser,
} from '../model/types';

export const userAPI = {
  // Логин пользователя
  login: async (credentials: ILoginCredentails) => {
    const { data } = await api.post<ILoginResponse>('/auth/login', credentials);
    return data;
  },

  // Регистрация пользователя
  register: async (credentials: IRegisterCredentials) => {
    const { data } = await api.post<IRegisterResponse>('/auth/register', credentials);
    return data;
  },

  // Получение информации о текущем пользователе
  getMe: async () => {
    const { data } = await api.get<IUser>('/auth/me');
    return data;
  },

  // Гостевой вход для работы с комнатами без аккаунта
  loginAsGuest: async (payload: IGuestLoginCredentials = {}) => {
    const { data } = await api.post<IGuestLoginResponse>('/auth/guest', payload);
    return data;
  },
};

export const login = userAPI.login;
export const register = userAPI.register;
export const getUser = userAPI.getMe;
export const loginAsGuest = userAPI.loginAsGuest;
