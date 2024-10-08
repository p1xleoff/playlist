import axios from "axios";

import { Screenshots, GameStore } from "../../types/Game";
import { getDateRanges } from "../../utils/dateTime";

//get API key from RAWG API

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
};

//get games from developers
export const fetchGamesByDeveloper = async (developer: string) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      developers: developer,
      page_size: 40
    }
  });
  return response.data.results;
};

//get games from publishers
export const fetchGamesByPublisher = async (publisher: string) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      publishers: publisher,
      page_size: 40
    }
  });
  return response.data.results;
};

export const fetchGamesByGenres = async (genre: string) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      genres: genre,
      ordering: '-rating',
      page_size: 40,
    },
  });

  return response.data.results;
};

//get games by tags
export const fetchGamesByTags = async (tag: string) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      tags: tag,
      ordering: '-rating',
      page_size: 40
    }
  });
  return response.data.results;
};

//get games by platoforms
export const fetchGamesByPlatforms = async (platform: number) => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      platforms: platform,
      ordering: '-rating',
      page_size: 40
    }
  });
  return response.data.results;
};



//discover - fetch games based on rawg ordering fields
export const discoverGames = async (ordering: string) => {
  console.log(`Fetching games with order: ${ordering}`); // Add this line for debugging
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      ordering,
    },
  });
  return response.data.results;
};

//get dates from date funtion
const { currentDate, lastYearDate, nextYearDate } = getDateRanges();

//discover - upcoming games
export const fetchUpcomingGames = async () => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      dates: `${currentDate},${nextYearDate}`,
      ordering: '-added',
      page_size: 40,
    },
  });
  return response.data.results;
};

//discover - fetch new games 
export const fetchNewGames = async () => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      dates: `${lastYearDate},${currentDate}`,
      ordering: '-released',
      page_size: 40,
    },
  });
  return response.data.results;
};

//discover - fetch popular games
export const fetchPopularGames = async () => {
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      dates: `${lastYearDate},${currentDate}`,
      ordering: '-rating',
      page_size: 40,
    },
  });
  return response.data.results;
};

//discover - fetch genres
export const fetchGenres = async (ordering: string, genre: string | null) => {
  console.log(`Fetching games with order: ${ordering} and genre: ${genre}`); // Add this line for debugging
  const response = await axios.get(`${BASE_URL}/games`, {
    params: {
      key: API_KEY,
      ordering: '-metacritic', //based on metascores, change to anything else for that ordering
      genres: genre,
      page_size: 40,
    },
  });

  return response.data.results;
};
