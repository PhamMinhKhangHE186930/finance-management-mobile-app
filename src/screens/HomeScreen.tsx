import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../component/Header';

// util import
import InputComponent from '../component/InputComponent';
import HomeScreenProvider from '../context/HomeScreenContext';

function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0); // header select

  const segmentData = {
    firstValue: 'Tiền chi',
    secondValue: 'Tiền thu',
    selectedIndex: selectedIndex,
    onSegmentChange: setSelectedIndex
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerType='home'
        segmentData={segmentData}
      />
      <View style={styles.separator} />

      <HomeScreenProvider amountType={selectedIndex === 0 ? 'expense' : 'income'}>
        <InputComponent />
      </HomeScreenProvider>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
})