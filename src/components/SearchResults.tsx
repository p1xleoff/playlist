import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';

//navigation
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';

//utils and hooks
import { useSearchGames } from '../hooks/gameHooks';
import { platformIcons } from '../data/iconMaps';
import { pxStyles } from '../theme/useTheme';
import { Game } from '../types/Game';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//components
import { Loading } from './Loading';

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const styles = useStyles();

  const { data: searchResults, error: searchError, isLoading: searchLoading } = useSearchGames(query);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: { item: Game }) => {
    const platforms = item.parent_platforms && item.parent_platforms.length > 0 ?
      item.parent_platforms.map(platform => {
        const iconName = platformIcons[platform.platform.name as keyof typeof platformIcons] || platformIcons.defaultIcon;
        return <Icon key={platform.platform.id} name={iconName} size={22} style={styles.platIcon} />;
      }) : null;

    return (
      <Pressable onPress={() => navigation.navigate('GameDetails', { game: item })}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.background_image || 'https://picsum.photos/536/354' }} style={{ width: 55, height: 70, borderRadius: 3 }} />
          <View style={styles.result}>
            <Text style={styles.itemTitle}>
              {item.name}
              <Text style={styles.itemSubtitle}> ({item.released?.slice(0, 4)})</Text>
            </Text>
            <View style={styles.platforms}>
              {platforms}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  if (searchLoading) {
    return <Loading />
  }

  if (searchError) {
    return <Text style={styles.errorText}>Error: {searchError.message}</Text>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <Text style={styles.noResultsText}>No results found.</Text>;
  }

  return (
    <FlatList
      data={searchResults}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const useStyles = pxStyles((theme) => ({
  listContainer: {
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  result: {
    marginLeft: 15,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.tertiary,
  },
  itemSubtitle: {
    fontSize: 16,
    color: '#a7a7a7',
  },
  platforms: {
    flexDirection: 'row',
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: theme.secondary,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  platIcon: {
    marginRight: 5,
    color: theme.primary
  }
}));

export default SearchResults;
