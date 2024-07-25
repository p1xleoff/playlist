import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TxtInput, Button } from '../components/Utils';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList } from '../routes/Navigator';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type AccountProps = NativeStackNavigationProp<RootStackParamList, 'Account'>;

interface FormValues {
  name: string;
  email: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Account: React.FC = () => {
  const initialValues: FormValues = { name: '', email: '' };
  const navigation = useNavigation<AccountProps>();
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
      // Fetch user info when component mounts
      const fetchUserInfo = async () => {
          try {
              const currentUser = await auth().currentUser;
              if (currentUser) {
                  setUserInfo(currentUser);
              }
          } catch (error) {
              console.error('Error fetching user info:', error);
              // Handle error (e.g., display error message to user)
          }
      };

      fetchUserInfo();

      return () => {
          // Cleanup function
      };
  }, []);
  
  return (
    <View>
      <View style={styles.avatarContainer}>
        <Image
          source={require('../assets/images/pxOwl.png')}
          style={styles.avatar}
        />
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <View style={styles.formContainer}>
            <TxtInput label="Name" name="name" iconName='account' value={userInfo?.displayName || ''} />
            <TxtInput label="Email" name="email" keyboardType="email-address" iconName='email' editable={false} value={userInfo?.email || 'qq'} />
            <Button
              onPress={() => handleSubmit()}
              title="Submit"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginTop : 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginRight: 15,
  },  
  formContainer: {
    padding: 16,
  },
});

export default Account;
