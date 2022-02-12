import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import scrapeData from '../scrapper/ExchangeRate';

function ExchangeRate() {
  const [data, setData] = useState();
  useEffect(() => {
    scrapeData().then((d) => setData(d));
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 12 }}>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

export default ExchangeRate;
