import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../routes/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { pxStyles } from '../theme/useTheme';
import Card from '../components/Card';

type ChangelogProps = NativeStackScreenProps<RootStackParamList, 'Changelog'>;

const Changelog = () => {
    const styles = useStyles();

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Card>
                <View style={styles.versionBadge}>
                    <Text style={styles.badgeText}>v1.0</Text>
                </View>
                <View>
                    <Text style={styles.text}>
                        {'\u25CF'} Initial build
                    </Text>
                </View>
            </Card>

        </ScrollView>
    )
}

export default Changelog

const useStyles = pxStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    badgeText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.primary
    },
    text: {
        color: theme.primary,
        fontWeight: '500'
    }
}));