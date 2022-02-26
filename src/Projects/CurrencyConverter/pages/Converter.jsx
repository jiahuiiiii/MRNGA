import {
  View, Text, Pressable, FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome5 } from '@expo/vector-icons';
import CurrencyInput from 'react-native-currency-input';
import CountryFlag from 'react-native-country-flag';
import { createStackNavigator } from '@react-navigation/stack';
import getISOByParam from '../scraper/ISOcountry';
import scrapeData from '../scraper/ExchangeRate';

function ConverterIndex({ navigation }) {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('MYR');
  const [toCurrency, setToCurrency] = useState('USD');

  useEffect(
    () => {
      if (fromValue <= 0) {
        setFromValue(0);
      }
    },
    [fromValue],
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Pressable
          onPress={() => navigation.navigate('currencyChooser')}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
          }}
        >
          <CountryFlag
            size={18}
            style={{ marginRight: 8, marginTop: 2 }}
            isoCode={getISOByParam('currency', fromCurrency).toLowerCase()}
          />
          <Text style={{ fontSize: 16 }}>{fromCurrency}</Text>
          <FontAwesome5 style={{ marginLeft: 8 }} name="caret-down" size={16} color="black" />
        </Pressable>
        <Pressable style={{ paddingVertical: 12 }}>
          <FontAwesome5 name="exchange-alt" size={18} color="black" />
        </Pressable>
        <Pressable style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <CountryFlag
            size={18}
            style={{ marginRight: 8, marginTop: 2 }}
            isoCode={getISOByParam('currency', toCurrency).toLowerCase()}
          />
          <Text style={{ fontSize: 16 }}>{toCurrency}</Text>
          <FontAwesome5 style={{ marginLeft: 8 }} name="caret-down" size={16} color="black" />
        </Pressable>
      </View>
      <View style={{ marginTop: 16 }}>
        <CurrencyInput
          style={{
            backgroundColor: '#F1F5F9',
            marginHorizontal: 24,
            padding: 16,
            fontSize: 24,
            borderRadius: 6,
            elevation: 6,
          }}
          value={fromValue}
          onChangeValue={setFromValue}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F1F5F9',
          marginHorizontal: 24,
          padding: 16,
          fontSize: 24,
          elevation: 6,
          borderRadius: 6,
          marginTop: 12,
        }}
      >
        <Text style={{ fontSize: 24 }}>0.00</Text>
      </View>
    </View>
  );
}
function CurrencyItem({ item }) {
  return (getISOByParam('currency', item[0]) !== undefined && currencyName.filter((e) => e.cc === item[0])[0] !== undefined ? (
    <View style={{
      marginVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
    }}
    >
      <CountryFlag
        style={{
          borderRadius: 4,
        }}
        isoCode={getISOByParam('currency', item[0]).toLowerCase()}
        size={48}
      />
      <View style={{
        justifyContent: 'center',
        marginLeft: 12,
        flex: 1,
      }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            flex: 1,
          }}
          numberOfLines={1}
        >
          {currencyName.filter((e) => e.cc === item[0])[0].name}
        </Text>
        {/* idk */}
      </View>
      <Text style={{
        color: '#EAB308',
        fontWeight: 'bold',
        marginLeft: 24,
      }}
      >
        {item[1]}
      </Text>
    </View>
  ) : null);
}

function CurrencyChooser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    scrapeData().then((d) => setData(d));
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
      padding: 16,
    }}
    >
      {data ? (
        <FlatList
          data={Object.entries(data.rates)}
          keyExtractor={(item) => item[0]}
          renderItem={CurrencyItem}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
        />
      ) : null }
      <Pressable style={{
        backgroundColor: '#EAB308',
        padding: 16,
      }}
      >
        <Text style={{ color: 'white' }}>Cancel</Text>

      </Pressable>
    </View>
  );
}

const Stack = createStackNavigator();
function Converter() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      persentation: 'modal',
    }}
    >
      <Stack.Screen name="converterIndex" component={ConverterIndex} />
      <Stack.Screen name="currencyChooser" component={CurrencyChooser} />
    </Stack.Navigator>
  );
}

export default Converter;
