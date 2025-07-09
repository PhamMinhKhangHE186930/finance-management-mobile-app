import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { ICategory } from '../dataset/category';
import { API_URL } from '../utils/api';
import { formatMoney, stringToNumberMoney } from '../utils/formatter';

export const HomeScreenContext = createContext<any>(null);

function HomeScreenProvider({ children, amountType }: { children: any, amountType: string }) {
    const [date, setDate] = useState(new Date()); // input date
    const [note, setNote] = useState(''); // note input
    const [amountInput, setAmountInput] = useState(0); // amount input
    const [amounText, setAmountText] = useState('');

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSaveTransaction = async () => {
        const data = {
            date: date,
            note: note,
            amount: amountInput,
            category: selectedCategory,
            user: null
        }
        const localData = JSON.parse(await AsyncStorage.getItem('transactionStore') || '[]');
        localData.push({
            ...data,
            category: categories.find(cate => cate._id === selectedCategory)
        });
        await AsyncStorage.setItem('transactionStore', JSON.stringify(localData));
        console.log(localData);
        try {
            // const response = await axios.post(`${API_URL}/transaction/saveTransaction`, data);

        } catch (error) {
        } finally {
            clearData();
        }
    }

    const clearData = () => {
        setDate(new Date());
        setNote('');
        setAmountInput(0);
        setAmountText('0');
        setSelectedCategory(categories[0]._id);
    }

    const setPreviousDate = () => {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - 1);
        setDate(prevDate);
    }

    const setAfterDate = () => {
        const afterDate = new Date(date);
        afterDate.setDate(date.getDate() + 1);
        setDate(afterDate);
    }

    const handleChangeText = (text: string) => {
        const numericValue = stringToNumberMoney(text);
        setAmountInput(numericValue);
        setAmountText(formatMoney('vi-VN', numericValue));
    };

    const handelSelectCategory = (id: string) => {
        setSelectedCategory(id);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/category/getAllExpenseCategory/${amountType}`);
                const responseData: ICategory[] = response.data.data
                setCategories(responseData);
                setSelectedCategory(responseData[0]._id);
            } catch (error) {

            }
        }
        fetchCategories();
    }, [amountType])
    return (
        <HomeScreenContext.Provider value={{
            date, note, amountInput, amounText,
            categories, selectedCategory, amountType,
            setDate, setNote, setAmountInput,
            setAmountText, setCategories, setSelectedCategory,
            handleSaveTransaction, setPreviousDate, setAfterDate,
            handleChangeText, handelSelectCategory
        }}>
            {children}
        </HomeScreenContext.Provider>
    )
}

export default HomeScreenProvider