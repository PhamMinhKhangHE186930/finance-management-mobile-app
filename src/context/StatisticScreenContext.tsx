import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export const StatisticScreenContext = createContext<any>(null);

function StatisticScreenProvider({ children, amountType }: { children: any, amountType: string }) {
    const [date, setDate] = useState(new Date()); // input date
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [transactionData, setTransactionData] = useState<any>([]);
    const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
    const [transactionGroup, setTransactionGroup] = useState<any>([]);


    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalAmount, setTotalAmout] = useState(0);


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
    const setPreviousDate = () => {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - 1);
        setDate(prevDate);
    }
    const setPreviousMonth = () => {
        const prevDate = date;
        prevDate.setMonth(prevDate.getMonth() - 1); // Tự xử lý lùi về tháng 12 và giảm năm nếu cần
        setDate(prevDate);
        setMonth(prevDate.getMonth() + 1);
        setYear(prevDate.getFullYear()); // Nên cập nhật cả năm nếu đang theo dõi
    };
    const setPreviousYear = () => {
        const prevDate : Date = date;
        prevDate.setFullYear(prevDate.getFullYear() - 1);
        setDate(prevDate);
        setMonth(prevDate.getMonth() + 1);
        setYear(prevDate.getFullYear());
    };

    const setAfterDate = () => {
        const afterDate = new Date(date);
        afterDate.setDate(date.getDate() + 1);
        setDate(afterDate);
    }

    const setAfterMonth = () => {
        const afterMonth = date;
        afterMonth.setMonth(afterMonth.getMonth() + 1); // Tự xử lý tiến lên tháng 1 và tăng năm nếu cần
        setDate(afterMonth);
        setMonth(afterMonth.getMonth() + 1);
        setYear(afterMonth.getFullYear()); // Nên cập nhật cả năm nếu đang theo dõi
    };
    const setAfterYear = () => {
        const afterDate : Date = date;
        afterDate.setFullYear(afterDate.getFullYear() + 1);
        setDate(afterDate);
        setMonth(afterDate.getMonth() + 1);
        setYear(afterDate.getFullYear());
    };

    const filteredTransaction = transactionData.filter((transaction: any) => {
        const date = new Date(transaction.date)
        const monthFilter = (amountType == 'monthly') ? (date.getMonth() + 1 == month) : true;
        const yearFilter = date.getFullYear() == year;
        const typeFilter = transaction.category.type == transactionType;
        return monthFilter && yearFilter && typeFilter;
    });


    useEffect(() => {
        groupTransactionDataMonthChart();
        calculateTotal();
    }, [transactionData, month, year, transactionType])

    const groupTransactionDataMonthChart = () => {
        const chartData: any[] = [];
        filteredTransaction.map((transaction: any) => {
            if (chartData.length == 0) {
                const data = {
                    value: transaction?.amount ?? 0,
                    color: transaction?.category.color,
                    text: transaction?.category.name,
                    categoryIcon: transaction?.category.categoryIcon,
                }
                chartData.push(data);
            } else {
                const findData = chartData.find((data: any) => {
                    if (data.text == transaction?.category.name) {
                        return true;
                    }
                    return false
                })
                if (findData) {
                    findData.value += transaction.amount;
                } else {
                    const data = {
                        value: transaction?.amount ?? 0,
                        color: transaction?.category.color,
                        text: transaction?.category.name,
                        categoryIcon: transaction?.category.categoryIcon,
                    }
                    chartData.push(data);
                }
            }
        })
        console.log(chartData)
        setTransactionGroup(chartData);
    }

    const calculateTotal = () => {
        let income = 0;
        let expense = 0;
        let total = 0;

        const filteredTransactionTotal = transactionData.filter((transaction: any) => {
            const date = new Date(transaction.date)
            const monthFilter = (amountType == 'monthly') ? (date.getMonth() + 1 == month) : true;
            const yearFilter = date.getFullYear() == year;
            return monthFilter && yearFilter;
        });

        filteredTransactionTotal.map((transaction: any) => {
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

    const changeTransactionType = () => {
        setTransactionType(transactionType => (
            transactionType == 'expense' ? 'income' : 'expense'
        ))
    }

    return (
        <StatisticScreenContext.Provider value={{
            date, transactionData, transactionType, transactionGroup,
            totalIncome, totalExpense, totalAmount, amountType,
            setTransactionData, setTransactionType,
            setDate, setPreviousDate, setAfterDate,
            setMonth, setYear, setPreviousMonth, setAfterMonth,
            changeTransactionType, setPreviousYear, setAfterYear
        }}
        >
            {children}
        </StatisticScreenContext.Provider>
    )
}

export default StatisticScreenProvider