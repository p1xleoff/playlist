import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/auth/firebase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';
import { Button } from '../components/Utils';
import { SmallLoader } from '../components/Loading';
import { Formik } from 'formik';
import * as Yup from 'yup';

type SignupProps = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const Signup = () => {
    const navigation = useNavigation<SignupProps>();

    const initialValues = {
        username: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username cannot be empty').min(2, 'Username must be atleast  characters'),
        email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
        password: Yup.string().required('Password cannot be empty').min(6, 'Password must be at least 6 characters')
    });

    const handleSignUp = async (values: typeof initialValues, { setErrors, setSubmitting }: any) => {
      try {
          const { email, password, username } = values;
          await signUp({ email, password, username });
          console.log('User registered');
          navigation.replace('Tabs');
      } catch (error: any) {
          // handle Firebase errors
          if (error.code === 'auth/email-already-in-use') {
              setErrors({ email: 'This email is already in use' });
          } else if (error.code === 'auth/weak-password') {
              setErrors({ password: 'Password is too weak' });
          } else {
              setErrors({ general: 'Error signing up user' });
          }
      } finally {
          setSubmitting(false);
      }
  };
    return (
        <View style={styles.container}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSignUp}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Sign up</Text>
                        <TextInput
                            value={values.username}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            placeholder='Name'
                            placeholderTextColor='#505050'
                            style={styles.input}
                            cursorColor='#fff'
                        />
                        {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                        <TextInput
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder='Email'
                            placeholderTextColor='#505050'
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            cursorColor='#fff'
                        />
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        <TextInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            placeholder='Password'
                            placeholderTextColor='#505050'
                            style={styles.input}
                            cursorColor='#fff'
                            secureTextEntry
                        />
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <Button
                            title={isSubmitting ? <SmallLoader /> : 'SignUp'}
                            onPress={handleSubmit}
                            style={styles.button}
                        />
                        <Text style={styles.text}>
                            Already have an account?
                            <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}> Login</Text>
                        </Text>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 15,
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#111111',
        padding: 10,
        marginVertical: 10,
        borderRadius: 3,
        elevation: 5,
        color: '#fff',
        fontWeight: '900',
    },
    title: {
        fontSize: 44,
        marginBottom: 20,
        fontWeight: '900',
        color: '#ffffff',
    },
    button: {
        marginTop: 20,
    },
    text: {
        marginTop: 15,
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
    },
    signupLink: {
        color: '#ffbb00',
        fontWeight: '900',
        fontSize: 18,
    },
    errorText: {
        color: '#ff1e00',
        fontWeight: '600'
    },
});

export default Signup;
