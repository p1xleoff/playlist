import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';
import SearchResults from '../components/SearchResults';

type SearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>

const Search = ({navigation}: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <SearchBar autoFocus={true}  onChangeText={handleSearchChange}/>
      </View>
      {searchQuery.length > 0 && <SearchResults query={searchQuery} />}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  input: {
    backgroundColor: 'black'
  },
})