import { StyleSheet, Text, View, FlatList, Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'

interface Game {
    id: number;
    title: string;
    imageUrl: string;
}

interface GameCarouselProps {
    games: Game[];
}

const GameCarousel: React.FC<GameCarouselProps> = ({ games }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemWidth = Dimensions.get('window').width * 0.9;
    const flatListRef = useRef<FlatList<Game>>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / itemWidth);
        setCurrentIndex(index);
    };

    const handleIndicatorPress = (index: number) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index });
            setCurrentIndex(index);
        }
    };

    const renderItem = ({ item }: { item: Game }) => (
        <View style={styles.item}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={games}
                ref={flatListRef}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                pagingEnabled
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate='fast'
                snapToInterval={itemWidth}
                snapToAlignment='center'
            />

            <View style={styles.indicatorContainer}>
                {games.map((_, index) => (
                    <Pressable key={index} onPress={() => handleIndicatorPress(index)}>
                        <View key={index} style={[styles.indicator, index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator]} ></View>
                    </Pressable>
                ))}
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    carouselContainer: {
        alignItems: 'center',
    },
    item: {
        width: Dimensions.get('window').width * 0.9,
        height: 200,
        overflow: 'hidden',
        borderRadius: 5,
        marginEnd: 10
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'black'
    },
    indicatorContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignSelf: 'center'
    },
    indicator: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: '#181818',
        height: 6,
        width: 6,
    },
    inactiveIndicator: {
        backgroundColor: '#9e9e9e'
    },
})


export default GameCarousel;