import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../routes/Navigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SearchBar from './SearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type HeaderProps = {
    title?: string;
    children?: JSX.Element | JSX.Element[];
    style?: StyleProp<ViewStyle>;
}

const Header = ({ title, children, style }: HeaderProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Icon name='cog-outline' size={28} color='#e0e0e0' />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 4,
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#dadada'
    },
})

export default Header;