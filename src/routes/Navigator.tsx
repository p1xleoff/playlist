import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Screens
import Home from '../screens/Home';
import Account from '../screens/Account';
import Settings from '../screens/Settings';
import Lists from '../screens/Lists';
import Search from '../screens/Search';
import GameDetails from '../screens/GameDetails';
import Discover from '../screens/Discover';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Landing from '../screens/Landing';
import Collection from '../screens/Collection';

// Types
import { Franchise, Game } from '../types/Game';
import { Loading } from '../components/Loading';

export type RootStackParamList = {
  Base: undefined;
  Home: undefined;
  Account: undefined;
  Settings: undefined;
  Lists: undefined;
  Search: undefined;
  Discover: undefined;
  Landing: undefined;
  Collection: undefined;
  Login: undefined;
  Signup: undefined;
  GameDetails: { game: Game | Franchise };
};

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Lists') {
          iconName = focused ? 'format-list-text' : 'format-list-checks';
        } else if (route.name === 'Discover') {
          iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
        } else {
          iconName = 'help';
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 60,
        backgroundColor: 'black',
      },
      tabBarItemStyle: {
        marginTop: 5,
        padding: 5,
      },
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Tab.Screen name="Lists" component={Lists} options={{ headerShown: false }} />
    <Tab.Screen name="Discover" component={Discover} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

interface NavigatorProps {
  user: FirebaseAuthTypes.User | null;
}

const Navigator: React.FC<NavigatorProps> = ({ user }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName="Base">
          {user ? (
            <>
              <Stack.Screen name="Base" component={BottomTabNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="GameDetails" component={GameDetails} options={{ headerShown: false }} />
              <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
              <Stack.Screen name="Discover" component={Discover} options={{ headerShown: false }} />
              <Stack.Screen name="Lists" component={Lists} options={{ headerShown: false }} />
              <Stack.Screen name="Collection" component={Collection} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
              {/* Uncomment the following line if you want to include Landing screen */}
              {/* <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} /> */}
            </>
          )}
        </Stack.Navigator>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default Navigator;
