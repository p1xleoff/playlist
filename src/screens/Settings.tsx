import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Linking,
  Pressable,
  TouchableOpacity
} from 'react-native';
import React, { useState, useRef } from 'react';

//navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes/Navigator';

//icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconSize } from '../utils/constants/enums/iconEnums';

//other
import { signOut } from '../services/auth/firebase';

//auth
import auth from '@react-native-firebase/auth';

//components
import Card from '../components/Card';
import { Separator, Badge, SettingsLink, RadioGroup, FloatBack } from '../components/Utils';
import Sheet, { SheetHandle } from '../components/ActionSheet';
import { useGameCount } from '../hooks/listHooks';
import { formatDate } from '../data/Date';
import { Loading, SmallLoader } from '../components/Loading';

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

// const sheetRef = useRef<BottomSheetMethods>(null);

const Settings = ({ navigation }: SettingsProps) => {
  const { totalGames, loading } = useGameCount();
  const user = auth().currentUser;
  const userJoinDate = user?.metadata.creationTime;

  //actions sheet
  const sheetRef = useRef<SheetHandle>(null);
  const themeActions = () => {
    sheetRef.current?.present();
  };

  //signout function
  const handleSignOut = async () => {
    try {
      await signOut();
      // navigation.navigate('Login'); //nav broken, throws payload was not handled by any nav
    } catch (error) {
      console.error('Error signing out', error);
      // handle errors
    }
  };

  const logging = () => {
    console.log('pressed!');
  };

  //function to open app notification settings
  const handleNotifPress = async () => {
    const packageName = 'com.playlist';
    await Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', [
      {
        key: 'android.provider.extra.APP_PACKAGE',
        value: packageName,
      },
    ]);
  };


  //radio button for theme
  const [themeSelect, setThemeSelect] = useState<string>('systemDefault')
  const themeOptions: Option[] = [
    { label: 'System Default', value: 'systemDefault' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ]
  const handleThemeOption = (value: string) => {
    setThemeSelect(value);
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <FloatBack onPress={() => navigation.goBack()}/> */}
      <ScrollView>
        <View>
          {/* profile card */}
          <Card>
            {/* profile info */}
            <View style={styles.cardBox}>
              {/* <Image
                source={require('../assets/images/pxOwl.png')}
                style={styles.avatar}
              /> */}
              {/* <View> */}
                <Text style={styles.userName}>{user?.displayName}</Text>
              {/* </View> */}
            </View>

            {/* <Separator style={{ backgroundColor: '#5a5a5a' }} /> */}

            {/* profile badges */}
            <View style={styles.cardBox}>
              <Badge>
                <Text style={styles.text}>{userJoinDate ? formatDate(userJoinDate) : (<SmallLoader />)}</Text>
              </Badge>
              <Badge>
                <TouchableOpacity onPress={() => navigation.navigate('Collection')}>
                  <Text style={styles.text}>
                    {totalGames ? `${totalGames} Games` : (<SmallLoader />)}
                  </Text>
                </TouchableOpacity>
              </Badge>
            </View>
          </Card>


          <View style={{ marginVertical: 15 }}>
            <View style={styles.category}>
              {/* account */}
              {/* <Text style={styles.categoryText}>Account</Text> */}
              <Card>
                <SettingsLink
                  onPress={() => navigation.navigate('Account')} iconName="account" title="Account" />
              </Card>
              <Card>
                <SettingsLink
                  onPress={() => navigation.navigate('Collection')} iconName="hexagon-multiple" title="Game Collection" />
              </Card>
            </View>


            <View style={styles.category}>
              {/* data */}
              {/* <Text style={styles.categoryText}>Data and Storage</Text> */}
              <Card>
                <SettingsLink
                  onPress={() => navigation.navigate('Data')} iconName="chart-donut" title="Data and Storage" />
              </Card>
            </View>

            <View style={styles.category}>
              {/* <Text style={styles.categoryText}>Preferences</Text> */}
              {/* theme */}
              <Card>
                <SettingsLink onPress={themeActions} iconName="palette" title="Theme" />
              </Card>

              {/* notifications */}
              <Card>
                <SettingsLink onPress={handleNotifPress} iconName="bell" title="Notifications" />
              </Card>
            </View>

            <View style={styles.category}>
              {/* <Text style={styles.categoryText}>Information</Text> */}
              <Card>
                <SettingsLink onPress={() => navigation.navigate('Acknowledgements')} iconName="information" title="Acknowledgements" />
              </Card>
            </View>

            {/* about */}
            <Card>
              <TouchableOpacity onPress={() => navigation.navigate('Dummy')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2, justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: 'white' }}>playl1st</Text>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Version 0.1</Text>
                  </View>
                  <Icon name="cheese" size={IconSize.m} color="#ffffff" />
                </View>
              </TouchableOpacity>
            </Card>

            {/* logOut */}
            <Card>
              <Pressable onPress={handleSignOut}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                  <Icon name="logout-variant" size={IconSize.m} color="#ff0000" />
                  <Text style={[styles.aboutText, styles.logOutText]}>Log Out</Text>
                </View>
              </Pressable>
            </Card>

          </View>
        </View>
      </ScrollView>

      <Sheet ref={sheetRef} title='Choose Theme'>
        <View>
          <Separator style={{ marginHorizontal: 10 }} />
          <RadioGroup options={themeOptions} selectedOption={themeSelect} onChange={handleThemeOption} />
        </View>
      </Sheet>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10
  },
  text: {
    color: '#000000',
    fontWeight: '900',
  },
  category: {
    // marginVertical: 7
  },
  categoryText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 3
  },
  cardBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 15,
  },
  userName: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  aboutText: {
    fontSize: 16,
    color: '#d6d6d6',
    fontWeight: '900',
  },
  logOutText: {
    color: '#ff0000',
    marginLeft: 15,
  },
});

export default Settings;
