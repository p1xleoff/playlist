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
import { Separator, Badge, SettingsLink, RadioGroup } from '../components/Utils';
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
      <ScrollView>
        <View>
          <View>
            {/* profile card */}
            <Card>
              {/* profile info */}
              <View style={styles.cardBox}>
                <Image
                  source={require('../assets/images/pxOwl.png')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.userName}>p1xLe</Text>
                  <Text style={styles.aboutText}>the master of screwups</Text>
                </View>
              </View>

              <Separator />

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

            {/* data */}
            <Card>
              <SettingsLink
                onPress={logging} iconName="chart-donut" title="Data and Storage" />
            </Card>

            {/* connections */}
            <Card>
              <SettingsLink onPress={() => navigation.navigate('Account')} iconName="puzzle" title="Connections" />
            </Card>

            {/* theme */}
            <Card>
              <SettingsLink onPress={themeActions} iconName="palette" title="Theme" />
            </Card>

            {/* notifications */}
            <Card>
              <SettingsLink onPress={handleNotifPress} iconName="bell" title="Notifications" />
            </Card>

            {/* about */}
            <Card>
              <SettingsLink onPress={() => navigation.navigate('Dummy')} iconName="information" title="About" />
            </Card>

            {/* logOut */}
            <Card>
              <Pressable onPress={handleSignOut}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                  <Icon name="location-exit" size={IconSize.m} color="#000000" />
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
    paddingVertical: 10,
    backgroundColor: 'black',
  },
  text: {
    color: '#ffffff',
    fontWeight: '600',
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
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  aboutText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '900',
  },
  logOutText: {
    color: '#ff0000',
    marginLeft: 15,
  },
});

export default Settings;
