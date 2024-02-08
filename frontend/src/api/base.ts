import axios, {AxiosRequestConfig} from 'axios';

const baseConfig: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
  withCredentials: true,
};

export const axiosInstance = axios.create({
  ...baseConfig,
});
