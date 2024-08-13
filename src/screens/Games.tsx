import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { RootStackParamList } from '../routes/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGenres, useFetchTaggedGames, usefetchDeveloperGames, usefetchPublisherGames, useFetchGenres, useFetchPlatformGames } from '../hooks/gameHooks';
import { Loading } from '../components/Loading';
import { DiscoverCard } from '../components/GameCard';
import Reload from '../components/Reload';
import { pxStyles } from '../theme/useTheme';
import { RouteProp, useRoute } from '@react-navigation/native';

type GamesProps = NativeStackScreenProps<RootStackParamList, 'Games'>;

const Games = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Games'>>();
  const { tag, tagName, developer, publisher, devName, pubName, genre, genreName, platform, platName } = route.params;

  const styles = useStyles();

  const { data: games, isLoading: gamesLoading, error: gamesError, refetch: refetchGames } = tag ? useFetchTaggedGames(tag || '') : developer ? usefetchDeveloperGames(developer || '') : publisher ? usefetchPublisherGames(publisher || '') : genre ? useFetchGenres(genre || '') : useFetchPlatformGames(platform || 0);

  //show loader if loading data
  if (gamesLoading) return <Loading />;

  //retry the games api request
  const retryFetch = () => {
    refetchGames();
  };
  if (gamesError) return <Reload onPress={retryFetch} />;

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.tagText}>
          { tag ? `Games Tagged with ${tagName}` : developer ? `Games Developed by ${devName}` : publisher ? `Games Published by ${pubName}` : genre ? `${genreName} Games` : platform ? `Games on ${platName}` : ''}
        </Text>
      </View>

      <FlatList
        data={games}
        keyExtractor={(game) => game.id.toString()}
        renderItem={({ item }) => <DiscoverCard game={item} />}
      />
    </View>
  );
};

const useStyles = pxStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 10,
  },
  tagText: {
    marginRight: 5,
    fontSize: 18,
    color: theme.tertiary,
    fontWeight: 'bold',
    marginVertical: 5,
  },
}));

export default Games;
