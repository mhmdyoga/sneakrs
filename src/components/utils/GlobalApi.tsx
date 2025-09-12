"use client"
import { useAuth } from '@/context/AuthContext';
import AxiosClient from 'axios';
import { useMemo } from 'react';

const GlobalApi = AxiosClient.create({
    baseURL: "https://sneakrs-be-production.up.railway.app/api/v1",
});

// Api
  const RegisterUser = (data: any) => GlobalApi.post('/auth/register', data);
  const LoginUser = (data: any) => GlobalApi.post('/auth/login', data);
  const LogoutUser = () => GlobalApi.post("/auth/logout")
  
  export const useApi = () => {
  const auth = useAuth();
  const token = (auth as any)?.token;

  // Gunakan useMemo biar tidak bikin instance baru tiap render
  const api = useMemo(() => {
    const instance = GlobalApi;
    if (token) {
      instance.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.Authorization;
    }
    return instance;
  }, [token]);

  return api;
};



export const Globalapi = {
    RegisterUser,
    LoginUser,
    LogoutUser
}



