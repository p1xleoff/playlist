import axios from "axios";

import { Game, Screenshots, GameStore } from "../../types/Game";
import { gameData } from "../../data/GamesData";

const API_KEY = '073e39c421ce4638ba42fea55efba786';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async () => {
  const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
  return response.data.results;
}

export const searchGames = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}&search=${query}`);
  return response.data.results;
}

export const fetchGameDetails = async (gameId: number) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
  return response.data;
}

export const fetchScreenShots = async (gameId: number): Promise<Screenshots[]> => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`);
  return response.data.results;
}

export const fetchGameStores = async (gameId: number): Promise<GameStore[]> => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/stores?key=${API_KEY}`);
  return response.data.results;
}

export const fetchAdditions = async (gameId: number) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/additions?key=${API_KEY}`);
  return response.data.results;
}

export const fetchBaseGame = async (gameId: number) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/parent-games?key=${API_KEY}`);
  return response.data.results;
}

export const fetchSeriesGames = async (gameId: number) => {
  const response = await axios.get(`${BASE_URL}/games/${gameId}/game-series?key=${API_KEY}`);
  return response.data.results;
}


// export const fetchGames = async () => {
//   return gameData[0].results;
// }

// export const searchGames = async (query: string) => {
//   const lowercasedQuery = query.toLowerCase();
//   const results = gameData[0].results.filter(game =>
//     game.name.toLowerCase().includes(lowercasedQuery)
//   );
//   return results;
// }