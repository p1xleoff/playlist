import React, { useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { RootStackParamList } from '../routes/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDiscoverGames, usePopularGames, useUpcomingGames, useNewGames } from '../hooks/gameHooks';
import { Loading } from '../components/Loading';
import { DiscoverCard } from '../components/GameCard';
import Sheet, { SheetHandle } from '../components/ActionSheet';
import { RadioGroup } from '../components/Utils';

type DiscoverProps = NativeStackScreenProps<RootStackParamList, 'Discover'>;

const Discover = () => {
  const [order, setOrder] = useState('relevance');
  const { data: games, isLoading, error } = useDiscoverGames(order);
  const { data: popularGames } = usePopularGames();
  const { data: upcomingGames } = useUpcomingGames();
  const { data: newGames } = useNewGames();
  const sheetRef = useRef<SheetHandle>(null);

  const DiscoverSortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Popularity', value: 'popular' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'New', value: 'new' },
    { label: 'Metacritic', value: '-metacritic' },
    { label: 'Rating', value: '-rating' },
    { label: 'Released', value: 'released' },
    { label: 'Added', value: '-added' },
  ];

  const handleSelect = (value: string) => {
    setOrder(value);
  };

  // Function to shuffle an array randomly
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Combine and sort games for the 'relevance' option
  let sortedGames;
  if (order === 'relevance') {
    const combinedGames = [...(popularGames || []), ...(upcomingGames || []), ...(newGames || [])];
    sortedGames = shuffleArray(combinedGames); // Randomize the order
  } else if (order === 'popular') {
    sortedGames = popularGames;
  } else if (order === 'upcoming') {
    sortedGames = upcomingGames;
  } else if (order === 'new') {
    sortedGames = newGames;
  } else {
    sortedGames = games?.sort((a: { [x: string]: string | number | Date; }, b: { [x: string]: string | number | Date; }) => {
      if (order === 'released' || order === 'created' || order === 'updated') {
        return new Date(b[order]).getTime() - new Date(a[order]).getTime();
      }
      return 0;
    });
  }

  if (isLoading) return <Loading />;
  if (error) return <Text>Something went wrong</Text>;

  return (
    <View style={styles.container}>
      <Header title="Discover" />
      <SearchBar />
      <TouchableOpacity onPress={() => sheetRef.current?.present()}>
        <Text style={styles.sort}>Sort</Text>
      </TouchableOpacity>
      <FlatList
        data={sortedGames}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DiscoverCard game={item} />}
      />

      <Sheet ref={sheetRef} title="Order by">
        <View>
          <RadioGroup options={DiscoverSortOptions} selectedOption={order} onChange={handleSelect} />
        </View>
      </Sheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 10,
  },
  sort: {
    color: 'red',
    fontSize: 22,
  },
  header: {
    color: 'white',
    fontSize: 22,
    marginVertical: 10,
  },
});

export default Discover;
