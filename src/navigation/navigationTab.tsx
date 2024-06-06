import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationMain} from './navigationMain';
import {Platform, useColorScheme} from 'react-native';
import IsSimulator from '../screen/simulator';

const Tab = createBottomTabNavigator();

export const NavigationTab = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDarkMode ? Colors.blue : Colors.red,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 1)'
            : Colors.darker,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: Platform.OS === 'android' ? 60 : 90,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          marginBottom: 10,
        },
        tabBarShowLabel: true,
      }}
      initialRouteName="NavigationMain">
      <Tab.Screen
        name="NavigationMain"
        component={NavigationMain}
        options={{
          tabBarLabel: 'Pokes',
          tabBarIcon: ({color, focused}) => (
            <>
              {focused ? (
                <Ionicons name="list-circle" size={23} color={color} />
              ) : (
                <Ionicons
                  name="list-circle-outline"
                  size={23}
                  color={'#6390F0'}
                />
              )}
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Simulator"
        component={IsSimulator}
        options={{
          tabBarLabel: 'Simulator',
          tabBarIcon: ({color, focused}) => (
            <>
              {focused ? (
                <AntDesign name="aliwangwang" size={23} color={color} />
              ) : (
                <AntDesign name="aliwangwang-o1" size={23} color={'#6390F0'} />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
