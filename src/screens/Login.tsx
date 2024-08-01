import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logIn } from '../services/auth/firebase';
import { Button } from '../components/Utils';
import { RootStackParamList } from '../routes/Navigator';
import { SmallLoader } from '../components/Loading';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

type LoginProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginProps>();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
    password: Yup.string().required('Password cannot be empty').min(6, 'Password must be at least 6 characters')
  });

  const handleLogin = async (values: typeof initialValues, { setErrors, setSubmitting }: any) => {
    try {
      const { email, password } = values;
      await logIn({ email, password });
      console.log('User Logged in');
      navigation.replace('Tabs');
    } catch (error: any) {
      //handle firebase errors
      if (error.code === 'auth/invalid-email') {
        setErrors({ email: 'Invalid email address' });
      } else if (error.code === 'auth/wrong-password') {
        setErrors({ password: 'Incorrect password' });
      } else if (error.code === 'auth/user-not-found') {
        setErrors({ email: 'User not found' });
      } else {
        setErrors({ general: 'Failed to log in' });
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
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Login</Text>
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
              title={isSubmitting ? <SmallLoader /> : 'Login'}
              onPress={handleSubmit}
              style={styles.button}
            />
            <Text style={styles.text}>
              Already have an account?
              <Text style={styles.loginLink} onPress={() => navigation.navigate('Signup')}> Sign up</Text>
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
    color: '#ffffff',
    elevation: 5,
    fontWeight: '900',
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
  errorText: {
    color: '#ff1e00',
    fontWeight: '600'
},
});

export default Login;
