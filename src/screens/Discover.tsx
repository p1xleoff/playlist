import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { RootStackParamList } from '../routes/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDiscoverGames, useFetchGames } from '../hooks/gameHooks';
import { Loading } from '../components/Loading';
import { DiscoverCard } from '../components/GameCard';
import Sheet, { SheetHandle } from '../components/ActionSheet';
import { RadioGroup } from '../components/Utils';

type DiscoverProps = NativeStackScreenProps<RootStackParamList, 'Discover'>;

const Discover = () => {
  const [order, setOrder] = useState('popularity');
  const { data: games, isLoading, error } = useDiscoverGames(order);
  const sheetRef = useRef<SheetHandle>(null);

  if (isLoading) return <Loading />;
  if (error) return <Text>Something went wrong</Text>;

  const DiscoverSortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Added', value: 'added' },
    { label: 'Rating', value: 'rating' },
    { label: 'Metacritic', value: '-metacritic' },
    { label: 'Released', value: 'released' },
    { label: 'Created', value: 'created' },
    { label: 'Updated', value: 'updated' },
  ];

  const handleSelect = (value: string) => {
    setOrder(value);
  }

  return (
    <View style={styles.container}>
      <Header title='Discover' />
      <SearchBar />
      <TouchableOpacity onPress={() => sheetRef.current?.present()}>
        <Text style={styles.sort}>Sort</Text>
      </TouchableOpacity>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DiscoverCard game={item} />}
      />

      <Sheet ref={sheetRef} title='Order by'>
        <View>
          <RadioGroup options={DiscoverSortOptions} selectedOption={order} onChange={handleSelect} />
        </View>
      </Sheet>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 10
  },
  sort: {
    color: 'red',
    fontSize: 22
  }
})
export default Discover;