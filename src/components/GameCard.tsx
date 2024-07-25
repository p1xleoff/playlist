import { Image, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Franchise, Game } from '../types/Game'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from './Utils';
import { platformIcons } from '../data/iconMaps';
import { NavigationProp, StackActions, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes/Navigator';

interface GameCardProps {
    game: Game | Franchise;
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
                        <View style={styles.platforms}>
                            {platforms}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='star' size={20} color={'gold'} />
                            <Text style={styles.rating}>{game.rating}</Text>
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
        color: '#e6e6e6',
        fontWeight: '600'
    },
    platforms: {
        flexDirection: 'row',
        marginVertical: 5,
        // backgroundColor: 'white',
        // borderRadius: 3,
        // paddingHorizontal: 5
    },
})

export default GameCard;