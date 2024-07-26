import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

type GameCardProps = {
  game: {
    id: number;
    name: string;
    background_image: string;
    list: string;
  };
  onPress: (gameId: number) => void;
};

const GCard = ({ game, onPress }: GameCardProps) => (
  <TouchableOpacity onPress={() => onPress(game.id)} style={styles.card}>
    <Image source={{ uri: game.background_image }} style={styles.image} />
    <View style={styles.info}>
      <Text style={styles.title}>{game.name}</Text>
      <Text style={styles.listLabel}>{game.list}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listLabel: {
    marginTop: 5,
    color: '#555',
  },
});

export default GCard;
