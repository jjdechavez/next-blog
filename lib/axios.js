import axios from "axios";
import {getToken} from './auth'

export default function useApi() {
  const instance = axios.create({
    baseURL: process.env.serverBaseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log('axioas')

  instance.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) config.headers.Authorization = token;
    return config;
  });

  return instance;
}
