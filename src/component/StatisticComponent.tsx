// npx expo install expo-linear-gradient - not working with expo go
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { PieChart, pieDataItem } from "react-native-gifted-charts";
import { StatisticScreenContext } from '../context/StatisticScreenContext';
import { formatMoney, formatMonthYear } from '../utils/formatter';

function StatisticComponent() {
    const {
        date, transactionData, transactionType, transactionGroup,
        totalIncome, totalExpense, totalAmount, amountType,
        setTransactionData, setTransactionType,
        setDate, setPreviousDate, setAfterDate,
        setMonth, setYear, setPreviousMonth, setAfterMonth,
        changeTransactionType, setPreviousYear, setAfterYear
    } = useContext(StatisticScreenContext);

    const [show, setShow] = useState(false);

    const data: pieDataItem[] = transactionGroup.length == 0 ?
        [{ value: 1, color: 'grey' }] :
        (transactionGroup.map((transaction: any) => (
            {
                value: transaction?.value ?? 0,
                color: transaction.color,
                text: transaction.text
            }
        )));

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate || new Date());
    };

    const showDatepicker = () => {
        setShow(true);
    };


    const calculatePercent = (amount: number, total: number): string => {
        let percent = 0;
        percent = (amount/total)*100;
        return percent.toFixed(1);
    }

    const renderTransactionInfor = ({ item }: { item: any }) => {
        return (
            <View>
                <View key={item.text} style={styles.transactionLine}>
                    <Ionicons style={{ flex: 1 }} name={item.categoryIcon as any} color={item.color} size={21} />
                    <Text style={{ flex: 10, fontSize: 17, paddingLeft: 5, fontWeight: '600' }}>{item.text}</Text>
                    <Text style={{ flex: 2, fontSize: 17, fontWeight: '600' }}>{formatMoney('vi-VN', item.value)}đ</Text>
                    <Text style={{ flex: 1, fontSize: 13, fontWeight: '400', paddingLeft: 5}}>({calculatePercent(item.value, totalExpense)}%)</Text>
                </View>
            </View>

        )
    }
    return (
        <ScrollView>
            <View>
                {/* input month/year */}
                {amountType == 'monthly' ? (
                    <View style={styles.dateCell}>
                        <TouchableOpacity style={styles.prevNextDate} onPress={setPreviousMonth}>
                            <Ionicons name="chevron-back-outline" size={30}></Ionicons>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                            <Text style={[styles.backgroundInput, styles.dateInput]}>{formatMonthYear('vi-VN', date)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.prevNextDate} onPress={setAfterMonth}>
                            <Ionicons name="chevron-forward-outline" size={30}></Ionicons>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.dateCell}>
                        <TouchableOpacity style={styles.prevNextDate} onPress={setPreviousYear}>
                            <Ionicons name="chevron-back-outline" size={30}></Ionicons>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                            <Text style={[styles.backgroundInput, styles.dateInput]}>{date.getFullYear()}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.prevNextDate} onPress={setAfterYear}>
                            <Ionicons name="chevron-forward-outline" size={30}></Ionicons>
                        </TouchableOpacity>
                    </View>
                )}
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}

                {/* overall information */}
                <View>
                    <View style={styles.overallAmount}>
                        <View style={styles.amount}>
                            <Text>Chi tiêu</Text>
                            <Text style={{ color: '#ff0000', fontSize: 17, fontWeight: '500' }}>-{formatMoney('vi-VN', totalExpense)}đ</Text>
                        </View>
                        <View style={styles.amount}>
                            <Text>Thu nhập</Text>
                            <Text style={{ color: '#007bff', fontSize: 17, fontWeight: '500' }}>+{formatMoney('vi-VN', totalIncome)}đ</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.totalAmount}>
                            <Text>Thu chi</Text>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>{formatMoney('vi-VN', totalAmount)}đ</Text>
                        </View>
                    </View>
                </View>

                {/* change category type */}
                <View style={styles.typeChange}>
                    <View style={styles.typeChangeButtonView}>
                        <TouchableOpacity style={transactionType == 'expense' ? styles.typeChangeButtonActive : styles.typeChangeButtonBlur} onPress={changeTransactionType}>
                            <Text style={transactionType == 'expense' ? styles.typeChangeTextActive : styles.typeChangeTextBlur}>Chi tiêu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.typeChangeButtonView}>
                        <TouchableOpacity style={transactionType == 'income' ? styles.typeChangeButtonActive : styles.typeChangeButtonBlur} onPress={changeTransactionType}>
                            <Text style={transactionType == 'income' ? styles.typeChangeTextActive : styles.typeChangeTextBlur}>Thu nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* chart */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <PieChart
                        data={data}
                        donut
                        strokeColor="white"
                        strokeWidth={1}
                        showText
                        textColor='rgb(237, 236, 236)'
                        textSize={15}
                        font='Arial'
                    />
                </View>
                <View style={styles.separator} />

                {/* Transaction detail */}
                <View>
                    <FlatList
                        renderItem={renderTransactionInfor}
                        data={transactionGroup}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default StatisticComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc',
        marginVertical: 5,
    },
    backgroundInput: {
        backgroundColor: 'rgba(194,234,234,255)',
        borderRadius: 6,
    },
    dateCell: {
        flexDirection: 'row',
    },
    datePicker: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateInput: {
        flex: 1,
        fontSize: 21,
        // paddingLeft: 20,
        // paddingRight: 20,
        textAlign: 'center'
    },
    prevNextDate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prevNextDateText: {
        fontSize: 25
    },
    valueAmount: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },
    overallAmount: {
        flex: 1,
        flexDirection: 'row',
    },
    amount: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        borderRadius: 5,
        padding: 5,
        margin: 3
    },
    totalAmount: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        borderRadius: 5,
        padding: 5,
        margin: 3
    },
    typeChange: {
        marginVertical: 15,
        flexDirection: 'row'
    },
    typeChangeButtonView: {
        flex: 1,
    },
    typeChangeButtonActive: {
        borderBottomWidth: 2,
        borderColor: '#007bff'
    },
    typeChangeTextActive: {
        textAlign: 'center',
        color: "#007bff",
        fontSize: 17,
        fontWeight: '500'
    },
    typeChangeButtonBlur: {
        borderBottomWidth: 2,
        borderColor: 'rgb(200, 200, 200)'
    },
    typeChangeTextBlur: {
        textAlign: 'center',
        color: "rgb(200, 200, 200)",
        fontSize: 17,
        fontWeight: '500'
    },
    transactionLine: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: "rgb(200, 200, 200)"
    },
})