import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Additions, BaseGame, Franchise } from '../types/Game'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from './Utils';
import { platformIcons } from '../data/iconMaps';

interface GameCardProps extends Franchise {
    edition: Franchise;
}

const GameCard = ({ name, rating, released, background_image, edition }: GameCardProps) => {
    const platforms =
        edition.parent_platforms && edition.parent_platforms.length > 0 ?
            edition.parent_platforms.map(platform => {
                const iconName = platformIcons[platform.platform.name as keyof typeof platformIcons] ||
                    platformIcons.defaultIcon;
                return <Icon key={platform.platform.id} name={iconName} size={22} color={'#1d1d1d'} />
            }) : null;
    const releaseSlice = released.slice(0, 4);
    return (
        <View style={styles.container}>
            <Image source={{ uri: background_image }} style={styles.image} />
            <View style={styles.infos}>
                <Text style={styles.title}>{name}
                    <Text style={styles.text}> ({releaseSlice})</Text>
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.platforms}>
                        {platforms}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='star' size={20} color={'#000000'} />
                        <Text style={styles.rating}>{rating}</Text>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: 'https://img.icons8.com/?size=48&id=YaSzxFsOJh3a&format=png' }} style={{ width: 20, height: 20 }} />
                        </View> */}
                    </View>
                </View>
                <Button
                    title='ADD TO COLLECTION'
                    onPress={() => console.log('done')}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 5,
        marginVertical: 5,
    },
    text: {
        color: '#4e4e4e'
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
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
    },
    rating: {
        color: '#383838',
        fontWeight: '600'
    },
    platforms: {
        flexDirection: 'row',
        marginVertical: 5,
    },
})

export default GameCard;