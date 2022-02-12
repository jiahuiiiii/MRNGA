import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExchangeRate from './pages/ExchangeRate';
import Converter from './pages/Converter';

const Tabs = createMaterialTopTabNavigator();

function CurrencyConverter() {
  return (
    <Tabs.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fcd34d',
      },
      tabBarLabelStyle: {
        color: 'white',
        fontWeight: 'bold',
      },
      tabBarIndicatorStyle: {
        backgroundColor: 'white',
      },
    }}
    >
      <Tabs.Screen name="Converter" component={Converter} />
      <Tabs.Screen name="ExchangeRate" options={{ title: 'Exchange Rate' }} component={ExchangeRate} />
    </Tabs.Navigator>
  );
}

export default CurrencyConverter;
