import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logIn } from '../services/auth/firebase';
import { Button } from '../components/Utils';
import { RootStackParamList } from '../routes/Navigator';

type LoginProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = ({ navigation }: { navigation: LoginProp }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const user = await logIn({ email, password });
            console.log('Logged in user', user);
            setLoading(false);
            navigation.navigate('Base');
        } catch (error) {
            setLoading(false)
            setError('failed to log in');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Login</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Email'
                    style={styles.input}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Password'
                    secureTextEntry
                    style={styles.input}
                />
                <Button title='Login' onPress={handleLogin} />
                <Text style={styles.text}>
                    Don't have an account?
                    <Text style={styles.loginLink} onPress={() => navigation.navigate('Signup')}>
                        {' '}Sign Up
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020202',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#222222',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        color: '#ffffff'
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
        fontSize: 16,
        color: '#ffffff'
    },
    loginLink: {
        color: '#ffbb00',
        fontWeight: '900',
        fontSize: 18
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
