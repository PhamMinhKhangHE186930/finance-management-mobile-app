import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from 'react';
import { ICategory } from '../dataset/category';
import { formatMoney, stringToNumberMoney } from '../utils/formatter';

export const HomeScreenContext = createContext<any>(null);

function HomeScreenProvider({ children, amountType }: { children: any, amountType: string }) {
    const [date, setDate] = useState(new Date()); // input date
    const [note, setNote] = useState(''); // note input
    const [amountInput, setAmountInput] = useState(0); // amount input
    const [amounText, setAmountText] = useState('');

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const incomeCate: ICategory[] = [
        { _id: "1", name: "Tiền lương", categoryIcon: 'wallet-outline', color: 'rgb(3, 162, 3)', type: 'income' },
        { _id: "2", name: "Phụ cấp", categoryIcon: 'analytics-outline', color: 'rgb(255, 102, 255)', type: 'income' },
        { _id: "3", name: "Tiền thưởng", categoryIcon: 'gift-outline', color: 'rgb(255, 51, 0)', type: 'income' },
        { _id: "4", name: "Thu nhập phụ", categoryIcon: 'business-outline', color: 'rgb(3, 165, 205)', type: 'income' },
        { _id: "5", name: "Đầu tư", categoryIcon: 'logo-bitcoin', color: 'rgb(247,147,26)', type: 'income' },
        { _id: "6", name: "Thu nhập tạm thời", categoryIcon: 'hourglass-outline', color: 'rgb(204, 153, 255)', type: 'income' }
    ];

    const expenseCate: ICategory[] = [
        { _id: "1", name: 'Ăn uống', categoryIcon: 'restaurant-outline', color: 'rgb(255, 137, 0)', type: 'expense' },
        { _id: "2", name: 'Chi tiêu hàng tháng', categoryIcon: 'cash-outline', color: 'rgb(0, 102, 0)', type: 'expense' },
        { _id: "3", name: 'Quần áo', categoryIcon: 'shirt-outline', color: 'rgb(0, 0, 204)', type: 'expense' },
        { _id: "4", name: 'Mỹ phẩm', categoryIcon: 'eyedrop-outline', color: 'rgb(255, 51, 204)', type: 'expense' },
        { _id: "5", name: 'Tiền nhà', categoryIcon: 'home-outline', color: 'rgb(255, 153, 0)', type: 'expense' },
        { _id: "6", name: 'Y tế', categoryIcon: 'medkit-outline', color: 'rgb(0, 102, 0)', type: 'expense' },
        { _id: "7", name: 'Giáo dục', categoryIcon: 'school-outline', color: 'rgb(255, 0, 0)', type: 'expense' },
        { _id: "8", name: 'Tiền điện', categoryIcon: 'flash-outline', color: 'rgb(255, 216, 0)', type: 'expense' },
        { _id: "9", name: 'Đi lại', categoryIcon: 'subway-outline', color: 'rgb(204, 136, 0)', type: 'expense' },
        { _id: "10", name: 'Phí giao lưu', categoryIcon: 'beer-outline', color: 'rgb(255, 153, 0)', type: 'expense' }
    ]

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
                if (amountType == 'income') {
                    setCategories(incomeCate);
                    setSelectedCategory(incomeCate[0]._id);
                } else {
                    setCategories(expenseCate);
                    setSelectedCategory(expenseCate[0]._id);
                }
                // const response = await axios.get(`${API_URL}/category/getAllExpenseCategory/${amountType}`);
                // const responseData: ICategory[] = response.data.data

                // setCategories(responseData);
                // setSelectedCategory(responseData[0]._id);

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