import SegmentedControl from '@react-native-segmented-control/segmented-control';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type HeaderProps = {
    headerType: string,
    segmentData: null | {
        firstValue: string,
        secondValue: string,
        selectedIndex: number,
        onSegmentChange: (index: number) => void
    }
}

function Header({ headerType, segmentData }: HeaderProps) {
    return (
        headerType == 'home' ? (
            <SegmentedControl
                values={[segmentData?.firstValue ?? '', segmentData?.secondValue ?? '']}
                selectedIndex={segmentData?.selectedIndex ?? 0}
                onChange={(e) => (segmentData?.onSegmentChange(e.nativeEvent.selectedSegmentIndex))}
                tintColor="#007bff"
                backgroundColor="rgb(227, 227, 227)"
                fontStyle={{ color: "#007bff", fontWeight: 'bold' }}
                activeFontStyle={{ color: "#f1f1f1" }}
            />
        ) : headerType == 'calendar' ? (
            <Text style={styles.calender}>Lịch</Text>
        ) : headerType == 'report' ? (
            <SegmentedControl
                values={[segmentData?.firstValue ?? '', segmentData?.secondValue ?? '']}
                selectedIndex={segmentData?.selectedIndex ?? 0}
                onChange={(e) => (segmentData?.onSegmentChange(e.nativeEvent.selectedSegmentIndex))}
                tintColor="#007bff"
                backgroundColor="rgb(227, 227, 227)"
                fontStyle={{ color: "#007bff", fontWeight: 'bold' }}
                activeFontStyle={{ color: "#f1f1f1" }}
            />
        ) : (
            <Text>Lịch</Text>
        )
    )
}

export default Header;

const styles = StyleSheet.create({
    calender:{
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
})