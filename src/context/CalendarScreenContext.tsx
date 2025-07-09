import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export const CalendarScreenContext = createContext<any>(null);

const expenseDot = { key: 'expense', color: 'rgb(255, 137, 0)' }
const incomeDot = { key: 'income', color: '#007bff' }

function CalendarScreenProvider({ children }: { children: any }) {
    const [selected, setSelected] = useState('');
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [transactionData, setTransactionData] = useState<any>([]);

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalAmount, setTotalAmout] = useState(0);

    // transactionGroupDate có dạng [[{transaction}, {...}], [...]] 
    const [transactionGroupDate, setTransactionGroupDate] = useState<any>([]);

    // useEffect(() => {
    //     const getTransactionData = async () => {
    //         const data = JSON.parse(await AsyncStorage.getItem('transactionStore') || '[]');
    //         setTransactionData(data);
    //     };

    //     getTransactionData();
    // }, [])

    useFocusEffect(
        useCallback(() => {
            const getTransactionData = async () => {
                const data = JSON.parse(await AsyncStorage.getItem('transactionStore') || '[]');
                if (JSON.stringify(data) != JSON.stringify(transactionData)) {
                    setTransactionData(data);
                }
            };

            getTransactionData();
        }, [])
    );

    const filteredTransaction = transactionData.filter((transaction: any) => {
        const date = new Date(transaction.date)
        const monthFilter = date.getMonth() + 1 == month;
        const yearFilter = date.getFullYear() == year;
        return monthFilter && yearFilter;
    });

    // mảng chứa các mảng con, mảng con chứa transaction theo ngày tháng năm
    const groupTransactionOnMonthChange = () => {
        const transactionGroup: any[] = [];
        // sắp xếp ngày mới nhất trước
        const sortedTransaction = filteredTransaction.sort((a: any, b: any) => b.date.localeCompare(a.date))

        // lặp qua các transaction trong tháng
        sortedTransaction.map((transaction: any) => {
            const date = transaction.date.split('T')[0];
            const newGroup: any[] = []; // tạo mảng mới cho từng ngày

            // nếu group trống, thêm mảng mới chứa ngày đầu tiền được thêm
            if (transactionGroup.length <= 0) {
                newGroup.push(transaction)
                transactionGroup.push(newGroup)
            } else {
                // tìm kiếm mảng chứa transaction chung ngày
                const findGroup = transactionGroup.find((items: any[]) => {
                    return items[0].date.includes(date);
                })
                // nếu có, thêm transaction tiếp theo vào mảng
                if (findGroup) {
                    // nếu thời gian nhập vào chính xác đến ms => trùng => không nhập nữa
                    if (findGroup[0].date == transaction.date) {
                        return;
                    }
                    findGroup.push(transaction);
                } else {
                    // nếu chưa có mảng của ngày của transaction hiện tại, tạo mảng mới cho ngày đấy và thêm vào
                    newGroup.push(transaction)
                    transactionGroup.push(newGroup)
                }
            }
        })
        setTransactionGroupDate(transactionGroup)
    }

    useEffect(() => {
        calculateTotal();
        groupTransactionOnMonthChange()
    }, [transactionData, month]);


    const calculateTotal = () => {
        let income = 0;
        let expense = 0;
        let total = 0;
        filteredTransaction.map((transaction: any) => {
            if (transaction.category.type === 'expense') {
                expense += transaction.amount;
                total -= transaction.amount;
            } else {
                income += transaction.amount;
                total += transaction.amount;
            }
        })

        setTotalIncome(income);
        setTotalExpense(expense);
        setTotalAmout(total);
    }

    return (
        <CalendarScreenContext.Provider
            value={{
                selected, month, year, transactionData, filteredTransaction,
                totalIncome, totalExpense, totalAmount, transactionGroupDate,
                setSelected, setMonth, setYear,
                setTotalIncome, setTotalExpense, setTotalAmout,
                groupTransactionOnMonthChange
            }}
        >
            {children}
        </CalendarScreenContext.Provider>
    )
}

export default CalendarScreenProvider