/* eslint-disable react/no-unstable-nested-components */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import TodoList from './src/Projects/TodoList';
import Home from './src/Home';
import CurrencyConverter from './src/Projects/CurrencyConverter';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'back',
          overlayColor: 'rgba(0, 0, 0, 0.2)',
          swipeEdgeWidth: 80,
          headerTintColor: 'black',
        }}
      >
        <Drawer.Screen
          options={{
            title: 'Home (´∀`)',
            drawerIcon: ({ color }) => <AntDesign name="home" size={20} color={color} />,
            drawerActiveTintColor: '#60A5',
            headerStyle: {
              backgroundColor: '#d8b4fe',
            },
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            title: 'Todo List ≖‿≖',
            drawerIcon: ({ color }) => <AntDesign name="bars" size={20} color={color} />,
            drawerActiveTintColor: '#fca5a5',
            headerStyle: {
              backgroundColor: '#f87171',
            },
          }}
          name="TodoList"
          component={TodoList}
        />
        <Drawer.Screen
          options={{
            title: 'Currency Converter $‿$',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="currency-usd-circle-outline" size={20} color={color} />,
            drawerActiveTintColor: 'orange',
            headerStyle: {
              backgroundColor: '#fcd34d',
            },
          }}
          name="CurrencyConverter"
          component={CurrencyConverter}
        />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
