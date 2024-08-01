import React from 'react';
import { View, Button, Alert, StyleSheet, StatusBar, TouchableOpacity, Text, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../routes/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { deleteCollectionGames } from '../services/auth/firebase';

type DataProps = NativeStackScreenProps<RootStackParamList, 'Data'>;

const Data = ({ navigation }: DataProps) => {

    const userId = auth().currentUser?.uid;

    const handleDeleteAllGames = async () => {
        if (userId) {
            Alert.alert(
                "Delete All Games",
                "Are you sure you want to delete all games from your collection?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Yes", onPress: async () => {
                            try {
                                await deleteCollectionGames(userId);
                                Alert.alert("Success", "All games have been deleted.");
                            } catch (error) {
                                Alert.alert("Error", "Failed to delete games. Please try again.");
                            }
                        }
                    },
                ]
            );
        } else {
            Alert.alert("Error", "User not found.");
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>Delete Games Collection</Text>
                    <Text style={styles.text}>This action will permanantly delete all your games from the app and clear the online cloud storage. There will be no way to restore it.</Text>
                    <Text style={styles.text}>All the games you added will be lost forever.</Text>
                    <TouchableOpacity style={styles.links} onPress={handleDeleteAllGames}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Delete Everything</Text>
                        <Icon name="delete-outline" color='tomato' size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    innerContainer: {
        marginHorizontal: "3%",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#858585',
        marginBottom: 15
    },
    card: {
        backgroundColor: '#101010',
        elevation: 10,
        borderColor: '#fff',
        padding: 15,
        borderRadius: 7,
        marginVertical: 10,
    },
    links: {
        flexDirection: 'row',
        backgroundColor: '#202020',
        elevation: 10,
        padding: 15,
        borderRadius: 7,
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});

export default Data;