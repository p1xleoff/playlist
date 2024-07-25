import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';

import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';

import { carouselGames } from '../data/Constants';
import GameCard from '../components/GameCard';
import { Button } from '../components/Utils';

//type cheking
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

//main functional component
const Home = ({ navigation }: HomeProps) => {

  return (
    <ScrollView>

      <View style={styles.container}>
        <SearchBar />
        <Text style={styles.title}>CURRENTLY PLAYING</Text>
        <Carousel games={carouselGames} />
        <View>
        <Button
          title='ADD TO COLLECTION'
          onPress={() => navigation.navigate('Collection')}
          />
          </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 10,
    // backgroundColor: 'black',
  },
  title: {
    color: '#111111',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'gold',
    padding: 10,
  }
});

export default Home;