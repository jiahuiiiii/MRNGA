import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MotiView
        from={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        transition={{
          loop: true, type: 'timing', duration: 3000, repeatReverse: false, easing: Easing.linear
        }}
      >
        <Ionicons name="logo-react" size={150} color="#581c87" />
      </MotiView>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1f2937',
        letterSpacing: 2,
      }}
      >
        M.R.N.G.A.
      </Text>
      <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1f2937',
        letterSpacing: 3,
      }}
      >
        2022
      </Text>
    </View>
  );
}
