import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { getUserLists } from '../services/auth/firebase';

export const useGameCount = () => {
    const [totalGames, setTotalGames] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const userId = auth().currentUser?.uid;

        if (userId) {
            const unsubscribe = getUserLists(userId, (listData) => {
                const gameCount = listData.reduce((count, list) =>
                    count + list.games.length, 0);
                setTotalGames(gameCount);
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, []);
    
    return { totalGames, loading };
};