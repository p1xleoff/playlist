import { useQuery } from "@tanstack/react-query";
import { searchGames, fetchGames, fetchGameDetails, fetchScreenShots, fetchGameStores, fetchAdditions, fetchBaseGame, fetchSeriesGames, discoverGames, fetchNewGames, fetchPopularGames, fetchUpcomingGames, fetchGenres } from "../services/api/rawg";
import { Additions, BaseGame, Franchise, Game, GameStore, Screenshots, SeriesGame, Store } from "../types/Game";

export const useSearchGames = (query: string) => {
    return useQuery<Game[], Error>({
        queryKey: ['games', query],
        queryFn: () => searchGames(query),
        enabled: !!query, //only run if query no empty
    });
};

export const useFetchGames = () => {
    return useQuery({
        queryKey: ['games'],
        queryFn: fetchGames,
    });
};

export const useFetchGameDetails = (gameId: number) => {
    return useQuery<Game, Error>({
        queryKey: ['gameDetails', gameId],
        queryFn: () => fetchGameDetails(gameId),
    });
};

export const useFetchScreenShots = (gameId: number) => {
    return useQuery<Screenshots[], Error>({
        queryKey: ['screenshots', gameId],
        queryFn: () => fetchScreenShots(gameId),
    })
};

export const useFetchGameStores = (gameId: number) => {
    return useQuery<GameStore[], Error>({
        queryKey: ['gameStores', gameId],
        queryFn: () => fetchGameStores(gameId),
    })
};

export const useFetchAddtions = (gameId: number) => {
    return useQuery<Franchise[], Error>({
        queryKey: ['additions', gameId],
        queryFn: () => fetchAdditions(gameId),
    })
};

export const useFetchBaseGame = (gameId: number) => {
    return useQuery<Franchise[], Error>({
        queryKey: ['baseGame', gameId],
        queryFn: () => fetchBaseGame(gameId),
    })
};

export const useFetchSeriesGames = (gameId: number) => {
    return useQuery<Franchise[], Error>({
        queryKey: ['series', gameId],
        queryFn: () => fetchSeriesGames(gameId),
    })
};

//////DISCOVER STUFF

//get games for discover with default rawg ordering
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

//discover - genres hook
export const useGenres = (ordering: string, genre: string | null) => {
    return useQuery({
        queryKey: ['fetchGenres', ordering, genre],
        queryFn: () => fetchGenres(ordering, genre),
        refetchOnWindowFocus: true,
    });
};


