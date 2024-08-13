import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react';

//styles
import { pxStyles } from '../theme/useTheme';
import { IconSize } from '../utils/constants/enums/iconEnums';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//navigation
import { RootStackParamList } from '../routes/Navigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type AboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;

const About = ({ navigation }: AboutProps) => {

    const styles = useStyles();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Icon name="cheese" size={IconSize.m} style={styles.icon} />
                <View>
                    <Text style={styles.superText}>Version</Text>
                    <Text style={styles.subText}>1.0</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Changelog')} style={styles.card}>
                <Icon name="code-tags" size={IconSize.m} style={styles.icon} />
                <View>
                    <Text style={styles.superText}>Changelog</Text>
                    <Text style={styles.subText}>- Bugs + Features</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Acknowledgements')} style={styles.card}>
                <Icon name="file-document" size={IconSize.m} style={styles.icon} />
                <View>
                    <Text style={styles.superText}>Third Party Notices</Text>
                    <Text style={styles.subText}>Libraries and APIs</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}


const useStyles = pxStyles((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 10
    },
    card: {
        padding: 10,
        backgroundColor: theme.card,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        elevation: 5
    },
    superText: {
        color: theme.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
    subText: {
        color: theme.secondary,
        fontSize: 16,
    },
    icon: {
        color: theme.primary,
        marginEnd: 20
    }
}));

export default About;