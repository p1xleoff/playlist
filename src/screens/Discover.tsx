import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

type Route = {
  key: string;
  title: string;
};

type RouteMap = {
  [key: string]: () => React.ReactElement;
};

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text style={styles.text}>First Route Content</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text style={styles.text}>Second Route Content</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
    <Text style={styles.text}>Third Route Content</Text>
  </View>
);

const renderScene: RouteMap = {
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
};

const Discover = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<Route[]>([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'third', title: 'Third' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <TouchableOpacity
          style={[styles.tabButton, focused && styles.tabButtonFocused]}
          onPress={() => {
            const index = routes.findIndex(r => r.key === route.key);
            setIndex(index);
          }}
        >
          <Text style={styles.tabText}>{route.title}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap(renderScene)}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  tabBar: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
    alignItems: 'center',
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonFocused: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
});


export default Discover;