import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../components/Utils';
import { RootStackParamList } from '../routes/Navigator';
import Loading from '../components/Loading';

type LandingProps = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

const Landing = () => {
    const navigation = useNavigation<LandingProps>();

    return (
        <View style={styles.container}>
            <Loading />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020202',
    },
    title: {
        fontSize: 44,
        marginBottom: 20,
        fontWeight: '900',
        color: '#ffffff'
    },
    button: {
        marginTop: 20,
    },
    text: {
        marginTop: 15,
        alignSelf: 'center',
        fontSize: 16
    },

})

export default Landing;