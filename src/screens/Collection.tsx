import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GameWithDate, getUserLists } from '../services/auth/firebase';
import Loading from '../components/Loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';
import { listColors } from '../data/ListMaps';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { getRelativeTime } from '../utils/dateTime';

type AllGamesProps = NativeStackScreenProps<RootStackParamList, 'Collection'>;

const AllGames = ({ navigation }: AllGamesProps) => {
    const [allGames, setAllGames] = useState<{ game: GameWithDate, listId: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortCriteria, setSortCriteria] = useState<string>('name');

    useEffect(() => {
        const userId = auth().currentUser?.uid;
        if (userId) {
            const unsubscribe = getUserLists(userId, (listsData) => {
                // Collect all games into a single array
                const games = listsData.flatMap(list =>
                    list.games.map((game: any) => ({
                        ...game,
                        listName: list.id,
                    }))
                );
                setAllGames(games);
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, []);

    //sorting function
    const sortGames = (games: any[]) => {
        return games.sort((a, b) => {
            switch (sortCriteria) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "addedDate":
                    return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
                case "listName":
                    return a.listName.localeCompare(b.listName);

            }
        })
    };
    const toggleSortCriteria = () => {
        const criteria = ['name', 'addedDate', 'listName'];
        const currentIndex = criteria.indexOf(sortCriteria);
        const nextIndex = (currentIndex + 1) % criteria.length;
        setSortCriteria(criteria[nextIndex]);
    };

    const sortedGames = sortGames(allGames);

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <SearchBar />
            </View>

            <View style={styles.header}>
                <Text style={[styles.title, { fontSize: 22 }]}>Game Collection</Text>
                <Text style={styles.count}>{allGames.length} Games</Text>
            </View>

            <TouchableOpacity style={styles.sortButton} onPress={toggleSortCriteria}>
                <Icon name="arrow-right-arrow-left" size={14} color="#ebebeb" style={{transform: [{ rotate: '90deg'}]}}/>
                <Text style={styles.sortText}>{sortCriteria}</Text>
            </TouchableOpacity>

            <FlatList
                data={sortedGames}
                keyExtractor={(game) => game.id.toString()}
                renderItem={({ item: game }) => (
                    <TouchableOpacity
                        style={styles.gameCard}
                        onPress={() => {
                            const { addedDate, ...gameDetails } = game;
                            navigation.navigate('GameDetails', { game: gameDetails });
                        }}
                    >
                        <Image source={{ uri: game.background_image }} style={styles.image} />
                        <View style={styles.gameDetails}>
                            <Text style={styles.title} numberOfLines={1}>{game.name}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[styles.badge, { color: listColors[game.listName] }]}>{game.listName.charAt(0).toUpperCase() + game.listName.slice(1)}
                                    <Text style={styles.date}> | {getRelativeTime(new Date(game.addedDate))}</Text>
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    count: {
        fontSize: 18
    },
    gameCard: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 4
    },
    gameDetails: {
        marginLeft: 10,
        flex: 1
    },
    title: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 16
    },
    date: {
        color: '#c7c7c7'
    },
    listName: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 4
    },
    badge: {
        borderRadius: 1,
        color: '#cecece',
        fontWeight: '600',
        marginRight: 10
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginHorizontal: 10,
    },
    sortText: {
        marginRight: 5,
        fontSize: 14,
        color: '#e9e9e9',
        fontWeight: 'bold',
        marginLeft: 5
    },
});

export default AllGames;
