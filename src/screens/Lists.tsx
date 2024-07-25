import { StyleSheet, Text, View, FlatList, Image, Pressable, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { deleteGameFromList, getCurrentUser, getUserLists, moveGameToList } from '../services/auth/firebase';
import { GameWithDate } from '../services/auth/firebase'; // Update the import
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Loading from '../components/Loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';
import { getRelativeTime } from '../utils/dateTime';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sheet, { SheetHandle } from '../components/ActionSheet';
import Snackbar from 'react-native-snackbar';
import { listIcons, listDesc, listColors } from '../data/ListMaps';
import { Separator } from '../components/Utils';

type ListsProps = NativeStackScreenProps<RootStackParamList, 'Lists'>;


const initialLayout = { width: 500 };

const Lists = ({ navigation }: ListsProps) => {
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<{ key: string; title: string }[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameWithDate | null>(null);
  const [sourceList, setSourceList] = useState<string | null>(null);

  const sheetRef = useRef<SheetHandle>(null);

  const currentUser = getCurrentUser();
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (currentUser) {
      const userId = auth().currentUser?.uid;
      if (userId) {
        const unsubscribe = getUserLists(userId, (listsData) => {
          setLists(listsData);

          // Set routes based on the lists
          const listRoutes = listsData.map((list: any) => ({
            key: list.id,
            title: list.id.charAt(0).toUpperCase() + list.id.slice(1),
          }));

          const orderRoutes = listRoutes.sort((a, b) => {
            const order = ['backlog', 'playing', 'wishlist', 'completed'];
            return order.indexOf(a.key) - order.indexOf(b.key);
          });

          setRoutes(orderRoutes);
          setLoading(false); // Stop loading after data is fetched
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
      }
    }
  }, []);

  //move game to between lists
  const handleMoveGame = async (targetList: string) => {
    if (selectedGame && sourceList) {
      try {
        if (userId) {
          const updatedGame = { ...selectedGame, addedDate: new Date() };
          await moveGameToList(userId, sourceList, targetList, updatedGame);
          sheetRef.current?.dismiss();
          Snackbar.show({
            text: `Game moved to ${targetList}`,
            duration: Snackbar.LENGTH_SHORT,
          });
          setSourceList(null);
          setSelectedGame(null);
        }
      } catch (error) {
        console.error('Failed to move game', error);
      }
    }
  };

  const handleDeleteGame = async () => {
    if (selectedGame && sourceList) {
      try {
        const userId = auth().currentUser?.uid;
        if (userId) {
          await deleteGameFromList(userId, sourceList, selectedGame.id);
          sheetRef.current?.dismiss();
          Snackbar.show({
            text: `Game deleted from ${sourceList}`,
            duration: Snackbar.LENGTH_SHORT,
          });
          setSourceList(null);
          setSelectedGame(null);
        }
      } catch (error) {
        console.error('Failed to delete game', error);
      }
    }
  };

  //filter sourcelist from other lists to show in action sheet
  const moveLists = lists.filter(list => list.id !== sourceList);

  const renderScene = SceneMap(
    routes.reduce((scenes, route) => {
      const list = lists.find(list => list.id === route.key);
      const colors = listColors[route.key];
      scenes[route.key] = () => (
        <View style={styles.container}>
          <View style={styles.listInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name={listIcons[route.key]} size={24} color={colors} />
              <Text style={[styles.title, { marginLeft: 10, color: colors}]}>{listDesc[route.key]}</Text>
            </View>
            <Text style={styles.count}>{list?.gameCount || null}</Text>
          </View>
          <FlatList
            data={lists.find(list => list.id === route.key)?.games || []}
            keyExtractor={(game) => game.id.toString()}
            style={{marginBottom: 60}}
            renderItem={({ item: game }: { item: GameWithDate }) => (
              <View>
                <TouchableOpacity
                  style={styles.gameCard}
                  onPress={() => {
                    const { addedDate, ...gameDetails } = game;
                    navigation.navigate('GameDetails', { game: gameDetails });
                  }}
                  onLongPress={() => {
                    setSelectedGame(game);
                    setSourceList(route.key);
                    sheetRef.current?.present();
                  }}>
                  <Image source={{ uri: game.background_image }} style={styles.image} />
                  <View style={styles.gameDetails}>
                    <Text style={styles.title} numberOfLines={1}>{game.name}</Text>
                    <Text style={styles.addedDate}>{`Added ${getRelativeTime(new Date(game.addedDate))}`}</Text>
                  </View>
                  <Pressable onPress={() => {
                    setSelectedGame(game);
                    setSourceList(route.key);
                    sheetRef.current?.present();
                  }}>
                    <Icon name="dots-vertical" color='#fff' size={24} style={{ marginLeft: 10 }} />
                  </Pressable>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      );
      return scenes;
    }, {} as any)
  );

  const renderTabBar = (props: any) => (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <SearchBar />
      </View>
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        indicatorStyle={styles.indicator}
        activeColor='#ffffff'
        inactiveColor='#919191'
        renderLabel={({ route, color }) => {
          const list = lists.find(list => list.id === route.key);
          return (
            <Text
              style={[styles.label, { color }]}
              numberOfLines={1}>
              {route.title}
            </Text>
          )
        }}
      />

      {selectedGame && (
        <Sheet ref={sheetRef} title={selectedGame.name}>
          <View style={{ paddingHorizontal: 10 }}>
            <Separator style={{ backgroundColor: '#494949' }} />
            <View>
              {moveLists.map(list => (
                <TouchableOpacity
                  key={list.id}
                  onPress={() => handleMoveGame(list.id)}
                  style={styles.actionListItem}
                >
                  <Icon name={listIcons[list.id] || 'progress-question'} size={24} color='#ffffff' />
                  <Text style={styles.actionListText}>
                    <Text style={{ color: '#c7c7c7' }}>Move to </Text>
                    {list.id.charAt(0).toUpperCase() + list.id.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Separator style={{ backgroundColor: '#494949' }} />
            <TouchableOpacity style={styles.actionListItem} onPress={handleDeleteGame}>
              <Icon name='delete-outline' size={24} color='#f32929' />
              <Text style={styles.actionListText}>Delete from Collection</Text>
            </TouchableOpacity>
          </View>
        </Sheet>
      )}
    </View>
  );


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={initialLayout}
      sceneContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  gameCard: {
    paddingVertical: 5,
    marginTop: 5,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  gameDetails: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 1,
    marginRight: 10,
  },
  addedDate: {
    color: '#afafaf',
    fontWeight: '600',
    fontSize: 12,
  },
  tabBar: {
    backgroundColor: '#000000',
    marginTop: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listInfo: { 
    flexDirection: 'row', 
    margin: 10, 
    justifyContent: 'space-between', 
  },
  label: {
    fontWeight: '900',
    color: '#fff',
  },
  count: {
    color: '#e0e0e0',
    fontWeight: '900',
    marginRight: 10
  },
  indicator: {
    backgroundColor: 'gold',
    borderRadius: 10,
    padding: 1.5,
  },
  actionListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  actionListText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  }
});

export default Lists;
