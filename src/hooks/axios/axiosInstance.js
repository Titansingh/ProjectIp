// axiosInstances.js
import axios from 'axios';

export const axiosInstanceAuth = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const axiosInstance2 = axios.create({
  baseURL: 'https://dummyapi.online',
});
