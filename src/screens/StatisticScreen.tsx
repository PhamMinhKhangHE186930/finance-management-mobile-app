import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../component/Header';
import StatisticComponent from '../component/StatisticComponent';
import StatisticScreenProvider from '../context/StatisticScreenContext';

function StatisticScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0); // header select

  const segmentData = {
    firstValue: 'Hàng tháng',
    secondValue: 'Hàng năm',
    selectedIndex: selectedIndex,
    onSegmentChange: setSelectedIndex
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerType='report'
        segmentData={segmentData}
      />
      <View style={styles.separator} />
      <StatisticScreenProvider amountType={selectedIndex === 0 ? 'monthly' : 'annual'}>
        <StatisticComponent />
      </StatisticScreenProvider>
    </SafeAreaView>
  )
}

export default StatisticScreen;

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