import axios from 'axios';

import type { Celeb } from './types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3030',
});

export const fetchCelebs = async (): Promise<Celeb[]> => {
  const response = await apiClient.get('/celebs');
  return response.data;
};

export const fetchCelebById = async (id: string) => {
  const response = await apiClient.get(`/celebs/${id}`);
  return response.data;
};

export const createCeleb = async (celeb: Celeb) => {
  const response = await apiClient.post('/celebs', celeb);
  return response.data;
};
