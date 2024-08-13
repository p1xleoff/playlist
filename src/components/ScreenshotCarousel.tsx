import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, FlatList } from 'react-native';

import { Screenshots } from '../types/Game';

interface ScreenshotsCarouselProps {
  screenshots: Screenshots[];
}

const ScreenshotsCarousel: React.FC<ScreenshotsCarouselProps> = ({ screenshots }) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const handleThumbnailPress = (image: string) => {
    setSelectedScreenshot(image);
  };

  return (
    <View style={styles.container}>
      {/* Main Screenshot */}
      <View style={styles.mainImageContainer}>
        <Image source={{ uri: selectedScreenshot || screenshots[0]?.image }} style={styles.mainImage} />
      </View>

      {/* Thumbnails */}
      <View style={styles.thumbnailsContainer}>
        <FlatList
          data={screenshots}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleThumbnailPress(item.image)}>
              <Image source={{ uri: item.image }} style={styles.thumbnail} />
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mainImageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  thumbnailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  thumbnail: {
    width: 90,
    height: 55,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default ScreenshotsCarousel;
