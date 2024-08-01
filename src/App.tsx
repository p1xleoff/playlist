import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Navigator from './routes/Navigator';  // Adjust the path as per your project structure
import Router from './routes/Router';

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return null; // Or some loading indicator
  }

  return (
    <NavigationContainer>
      <Navigator user={user} />
    </NavigationContainer>
  );
};

export default App;
