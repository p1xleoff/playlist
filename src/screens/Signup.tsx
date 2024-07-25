import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { signUp } from '../services/auth/firebase';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';
import { Button } from '../components/Utils';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const Signup = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation<SignupScreenNavigationProp>();

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        try {
            const user = await signUp({ email, password, username });
            console.log('User registered', user);
            setLoading(false);
            navigation.navigate('Base');
        } catch (error) {
            setLoading(false);
            setError('Error signing up user');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Signup</Text>
                <TextInput value={username} onChangeText={setUserName} placeholder='Name' style={styles.input} />
                <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.input} keyboardType="email-address" autoCapitalize="none" />
                <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={styles.input} secureTextEntry />
                {error && <Text style={styles.errorText}>{error}</Text>}
                <Button title={loading ? 'Signing up...' : 'Signup'} onPress={handleSignUp} style={styles.button} disabled={() => loading} />
                <Text style={styles.text}>
                    Already have an account?
                    <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}> Login</Text>
                </Text>
            </View>
        </View>
    )
}


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
    loginLink: {
        color: '#ffbb00', 
        fontWeight: '900',
        fontSize: 18
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
})

export default Signup;