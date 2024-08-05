import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header';
import SearchBar from './SearchBar';
import { pxStyles } from '../theme/useTheme';


type ReloadProps = {
    onPress: () => void;
}

const Reload = ({ onPress }: ReloadProps) => {
    const styles = useStyles();
    
    return (
        <View style={styles.container}>
            {/* <Header title=''/>
            <SearchBar /> */}
            <View style={styles.icon}>
            {/* <Text style={{fontSize: 200, color: 'white'}}>=(</Text> */}
                <Icon name="emoticon-dead-outline" size={200} style={styles.emote} />
            </View>

            <View style={styles.infoContainer}>
            <Text style={styles.errorTitle}>
                Oops! This is unexpected.
            </Text>            
            <Text style={styles.errorText}>
                Something went wrong while something was happening somewhere.
                Here, press this button to try something again.
            </Text>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>RELOAD</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const useStyles = pxStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 20
    },
    icon: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    emote: {
        color: theme.secondary
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 80,
    },
    button: {
        backgroundColor: theme.primary,
        padding: 7,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        alignSelf: 'center',
        borderRadius: 3,
        marginVertical: 20,
        elevation: 5
    },
    buttonText: {
        color: theme.background,
        fontWeight: '900',
        fontSize: 18,
    },
    errorTitle: {
        color: theme.tertiary,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5
    },
    errorText: {
        color: theme.secondary,
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 2
    }
}));

export default Reload;