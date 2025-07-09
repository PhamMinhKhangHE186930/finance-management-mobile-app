import React from 'react'
import { SafeAreaView } from 'react-native'
import CalendarComponent from '../component/CalendarComponent'
import CalendarInformation from '../component/CalendarInformation'
import Header from '../component/Header'
import CalendarScreenProvider from '../context/CalendarScreenContext'

function CalendarScreen() {
  return (
    <SafeAreaView>
      {/* <Text>CalendarScreen</Text> */}
      <Header headerType='calendar' segmentData={null}></Header>
      <CalendarScreenProvider>
        <CalendarComponent />
        <CalendarInformation />
      </CalendarScreenProvider>
    </SafeAreaView>
  )
}

export default CalendarScreen