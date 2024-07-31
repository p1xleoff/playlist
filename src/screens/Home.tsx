import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';

import auth from '@react-native-firebase/auth';

import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import { Button } from '../components/Utils';
import Header from '../components/Header';

import { ReGame, getUserLists } from '../services/auth/firebase';
import { Loading } from '../components/Loading';
import { dashList } from '../data/ListMaps';

//type cheking
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

//main functional component
const Home = ({ navigation }: HomeProps) => {
  const [games, setGames] = useState<{ [key: string]: ReGame[] }>({});
  const [loading, setLoading] = useState(true);
  const userId = auth().currentUser?.uid;

  //list order for sorting
  const listOrder = ['backlog', 'playlist', 'completed', 'wishlist'];

  useEffect(() => {
    if (userId) {
      const unsubscribe = getUserLists(userId, (listData) => {
        const gamesByList: { [key: string]: ReGame[] } = {};
        listData.forEach((list: any) => {
          gamesByList[list.id] = list.games.slice(0, 3); //select 3 games from the list
        });
        setGames(gamesByList);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [userId]);

  if (loading) {
    return <Loading />
  }

  //sort lists based on order
  const sortedListKeys = Object.keys(games).sort((a, b) => {
    const indexA = listOrder.indexOf(a);
    const indexB = listOrder.indexOf(b);
    return indexA - indexB;
  });

  // Check if there are no games in any list
  const noGamesInAnyList = sortedListKeys.every((listName) => games[listName].length === 0);

  return (
    <View style={styles.container}>
      <Header title='playlist' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar />
        {noGamesInAnyList ? (
          <View style={styles.noGamesContainer}>
            <Text style={styles.noGamesText}>No games in your collection yet.</Text>
            <Text style={styles.noGamesText}>Search for games or go to Discover to add some games to your collection.</Text>
          </View>
        ) : (
          <View style={{ marginVertical: 15 }}>
            {sortedListKeys.map((listName) => (
              games[listName].length > 0 && (
                <View key={listName} style={styles.listSection}>
                  <Text style={styles.listTitle}>{dashList[listName]}</Text>
                  <Carousel games={games[listName]} />
                </View>
              )
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#000000',
  },
  listTitle: {
    color: '#d4d4d4',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 7,
  },
  listSection: {
    marginBottom: 20
  },
  button: {
    backgroundColor: 'gold',
    padding: 10,
  },
  noGamesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noGamesText: {
    color: '#d4d4d4',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  },
});

export default Home;
