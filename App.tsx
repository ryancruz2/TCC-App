import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  LogBox
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './src/pages/search';
import Settings from './src/pages/settings';
import ListPhones from './src/pages/mobile';
import { createStackNavigator } from '@react-navigation/stack';
import { Companies, PageCompany, Phones } from './src/components/MenuSearch';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
export default function App() {
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'phone-portrait-sharp';
        break;
      case 'Settings':
        icon = 'settings-outline';
        break;
      case 'Search':
        icon = 'search-sharp';
        break;
    }

    return (
      <Ionicons name={icon} size={25} color={routeName === selectedTab ? 'black' : 'gray'} />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="#f5fffa"
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({ navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { navigate("Search") }}
            >
              <Ionicons name={'search-sharp'} size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="Home"
          position="LEFT"
          component={() => <ListPhones />}
        />
        <CurvedBottomBarExpo.Screen
          name="Settings"
          component={() => <Settings />}
          position="RIGHT"
        />
        <Stack.Screen name="Phones" component={Phones} />
        <Stack.Screen name="Companies" component={Companies} />
        <Tab.Screen name="Search" component={Search} />
        <Stack.Screen name="PageCompany" component={PageCompany} />
      </CurvedBottomBarExpo.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  }
});
