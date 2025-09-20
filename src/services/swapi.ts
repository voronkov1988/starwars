import axios from 'axios';
import { CharactersResponse } from '../types/character';

const BASE_URL = 'https://swapi.dev/api';

export const swapi = axios.create({
  baseURL: BASE_URL,
});

export const getCharacters = async (page: number = 1, search: string = ''): Promise<CharactersResponse> => {
  try {
    const response = await swapi.get('/people', {
      params: {
        page: page.toString(),
        search: search || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacter = async (id: string): Promise<any> => {
  const response = await swapi.get(`/people/${id}`);
  return response.data;
};