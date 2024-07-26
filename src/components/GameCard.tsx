import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Franchise, Game } from '../types/Game'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from './Utils';
import { platformIcons } from '../data/iconMaps';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/Navigator';

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const platforms =
        game.parent_platforms && game.parent_platforms.length > 0 ?
            game.parent_platforms.map(platform => {
                const iconName = platformIcons[platform.platform.name as keyof typeof platformIcons] ||
                    platformIcons.defaultIcon;
                return <Icon key={platform.platform.id} name={iconName} size={22} color={'#ffffff'} />
            }) : null;

    const releaseSlice = game.released?.slice(0, 4);

    const openGame = () => {
        navigation.dispatch(StackActions.push('GameDetails', { game }));
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={openGame}>
                <Image source={{ uri: game.background_image }} style={styles.image} />
                <View style={styles.infos}>
                    <Text style={styles.title}>{game.name}
                        <Text style={styles.text}> ({releaseSlice})</Text>
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.badgeStrip}>
                            {platforms}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='star' size={20} color={'gold'} />
                            <Text style={[styles.rating, {color: 'white'}]}>{game.rating}</Text>
                            {/* <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: 'https://img.icons8.com/?size=48&id=YaSzxFsOJh3a&format=png' }} style={{ width: 20, height: 20 }} />
                        </View> */}
                        </View>
                    </View>
                    <Button
                        title='ADD TO COLLECTION'
                        onPress={openGame}
                    />
                </View>
            </Pressable>
        </View>
    )
}

//card for discover component
const DiscoverCard: React.FC<GameCardProps> = ({ game }) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const platforms =
        game.parent_platforms && game.parent_platforms.length > 0 ?
            game.parent_platforms.map(platform => {
                const iconName = platformIcons[platform.platform.name as keyof typeof platformIcons] ||
                    platformIcons.defaultIcon;
                return <Icon key={platform.platform.id} name={iconName} size={22} color={'#000000'} style={{marginHorizontal: 2}}/>
            }) : null;

    const releaseSlice = game.released?.slice(0, 4);

    const openGame = () => {
        navigation.dispatch(StackActions.push('GameDetails', { game }));
        console.log(game.additions_count)
    };
   
    return (
        <View style={styles.container}>
            <Pressable onPress={openGame}>
                <Image source={{ uri: game.background_image }} style={styles.image} />
                <View style={styles.infos}>
                    <Text style={styles.title}>{game.name}
                        <Text style={styles.text}> ({releaseSlice})</Text>
                    </Text>
                    <View style={styles.badgeStrip}>
                        <View style={styles.badge}>
                            {platforms}
                        </View>
                            <View style={styles.badge}>
                                <Icon name='star' size={20} color={'gold'} />
                                <Text style={styles.rating}>{game.rating}</Text>
                            </View>
                            <View style={styles.badge}>
                                <Image source={{ uri: 'https://img.icons8.com/?size=48&id=YaSzxFsOJh3a&format=png' }} style={{ width: 20, height: 20 }} />
                                <Text style={styles.rating}> {game.metacritic || 'NA'}</Text>
                            </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272727',
        elevation: 5,
        borderRadius: 5,
        marginVertical: 5,
    },
    text: {
        color: '#f3f3f3'
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    infos: {
        padding: 10,
        // alignItems: 'center'
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    rating: {
        color: '#000000',
        fontWeight: '600'
    },
    badgeStrip: {
        flexDirection: 'row',
        marginVertical: 5,
        height: 'auto',
        // backgroundColor: '#050505',
        // borderRadius: 3,
        // paddingHorizontal: 5
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 2,
        paddingHorizontal: 7,
        marginEnd: 5,
        borderRadius: 3
    }
})

export { GameCard, DiscoverCard };