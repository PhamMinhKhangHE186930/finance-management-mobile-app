import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CalendarScreenContext } from '../context/CalendarScreenContext';
import { formatDate, formatMoney } from '../utils/formatter';


function CalendarInformation() {
    const {
        selected, month, year, transactionData, filteredTransaction,
        totalIncome, totalExpense, totalAmount,
        setSelected, setMonth, setYear, transactionGroupDate,
        setTotalIncome, setTotalExpense, setTotalAmout
    } = useContext(CalendarScreenContext);

    const totalAmountInMonth = (transactions: any): number => {
        let total = 0;
        transactions.map((transaction: any) => {
            if (transaction.category.type === 'expense') {
                total -= transaction.amount
            } else {
                total += transaction.amount;
            }
        })
        return total;
    }

    const renderCalendarInfor = ({ item }: { item: any }) => {
        return (
            <View>
                <View style={styles.calendarInfoText}>
                    <Text style={{fontWeight: '600',}}>{formatDate('vi-VN', new Date(item[0].date))}</Text>
                    <Text style={{fontWeight: '600',}}>{formatMoney('vi-VN', totalAmountInMonth(item))}đ</Text>
                </View>
                {item.map((transaction: any, index: number) => (
                    <View key={index} style={styles.transactionLine}>
                        <Ionicons style={{ flex: 1 }} name={transaction.category.categoryIcon as any} color={transaction.category.color} size={21} />
                        <Text style={{ flex: 10, fontSize: 17, paddingLeft: 5, fontWeight: '600' }}>{transaction.category.name} <Text style={{ fontSize: 12, fontWeight: '300' }}>({transaction.note})</Text></Text>
                        <Text style={{ flex: 2, fontSize: 17, fontWeight: '600', color: transaction.category.type === 'expense' ? '#ff0000' : '#007bff' }}>{transaction.category.type === 'expense' ? `-${formatMoney('vi-VN', transaction.amount)}` : formatMoney('vi-VN', transaction.amount)}đ</Text>
                    </View>
                ))}
            </View>

        )
    }
    return (
        <View>
            <View style={styles.headerInfor}>
                <View>
                    <Text>Thu nhập</Text>
                    <Text style={styles.imcomeAmount}>{formatMoney('vi-VN', totalIncome)}đ</Text>
                </View>
                <View>
                    <Text>Chi tiêu</Text>
                    <Text style={styles.expenseAmount}>{formatMoney('vi-VN', totalExpense)}đ</Text>
                </View>
                <View>
                    <Text>Tổng</Text>
                    <Text style={[styles.totalAmount, { color: totalAmount < 0 ? '#ff0000' : '#007bff' }]}>{formatMoney('vi-VN', totalAmount)}đ</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={transactionGroupDate}
                    renderItem={renderCalendarInfor}
                    numColumns={1}
                    removeClippedSubviews
                />
            </View>
        </View>
    )
}

export default CalendarInformation;

const styles = StyleSheet.create({
    headerInfor: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    calendarInfoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: 'rgb(227, 227, 227)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgb(200, 200, 200)',
    },
    imcomeAmount: {
        textAlign: 'center',
        color: '#007bff'
    },
    expenseAmount: {
        textAlign: 'center',
        color: '#ff0000'
    },
    totalAmount: {
        textAlign: 'center',
    },
    transactionItem: {
        flexDirection: 'row',
    },
    transactionLine: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})