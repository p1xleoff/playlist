import axios from "axios";

import { Game, Screenshots, GameStore } from "../../types/Game";
import { getDateRanges } from "../../utils/dateTime";
import { useQuery } from "@tanstack/react-query";

const API_KEY = '073e39c421ce4638ba42fea55efba786';
const BASE_URL = 'https://api.rawg.io/api';

//discover - fetch games based on rawg ordering fields
const discoverGames = async (ordering: string) => {
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
const fetchUpcomingGames = async () => {
    const response = await axios.get(`${BASE_URL}/games`, {
        params: {
            key: API_KEY,
            dates: `${currentDate},${nextYearDate}`,
            ordering: '-added',
            page_size: 20,
        },
    });
    return response.data.results;
};

//discover - fetch new games 
const fetchNewGames = async () => {
    const response = await axios.get(`${BASE_URL}/games`, {
        params: {
            key: API_KEY,
            dates: `${lastYearDate},${currentDate}`,
            ordering: '-released',
            page_size: 20,
        },
    });
    return response.data.results;
};

//discover - fetch popular games
const fetchPopularGames = async () => {
    const response = await axios.get(`${BASE_URL}/games`, {
        params: {
            key: API_KEY,
            dates: `${lastYearDate},${currentDate}`,
            ordering: '-rating',
            page_size: 20,
        },
    });
    return response.data.results;
};


const fetchGenres = async (ordering: string, genre: string | null) => {
    console.log(`Fetching games with order: ${ordering} and genre: ${genre}`); // Add this line for debugging

    const response = await axios.get(`${BASE_URL}/games`, {
        params: {
            key: API_KEY,
            ordering: '-rating', //based on rating, change to anything else
            genres: genre,
        },
    });

    return response.data.results;
};


export const useGenres = (ordering: string, genre: string | null) => {
    return useQuery({
        queryKey: ['fetchGenres', ordering, genre],
        queryFn: () => fetchGenres(ordering, genre),
        refetchOnWindowFocus: true,
    });
};


export const useDiscoverGames = (ordering: string) => {
    return useQuery({
        queryKey: ['discoverGames', ordering],
        queryFn: () => discoverGames(ordering),
        enabled: !!ordering, // Only fetch if ordering is truthy
        refetchOnWindowFocus: true, // Refetch on window focus
    });
};

//discover - popular games hook 
export const usePopularGames = () => {
    return useQuery({
        queryKey: ['popularGames'],
        queryFn: fetchPopularGames,
        refetchOnWindowFocus: true,
    });
};

//discover - upcoming games hook
export const useUpcomingGames = () => {
    return useQuery({
        queryKey: ['upcomingGames'],
        queryFn: fetchUpcomingGames,
        refetchOnWindowFocus: true,
    });
};

//discover - new games hook
export const useNewGames = () => {
    return useQuery({
        queryKey: ['newGames'],
        queryFn: fetchNewGames,
        refetchOnWindowFocus: true,
    });
};