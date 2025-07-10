import React, { useContext, useMemo } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { CalendarScreenContext } from '../context/CalendarScreenContext';

LocaleConfig.locales['vi'] = {
    monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12'
    ],
    monthNamesShort: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay'
}

LocaleConfig.defaultLocale = 'vi';

const expenseDot = { key: 'expense', color: 'rgb(255, 137, 0)' }
const incomeDot = { key: 'income', color: '#007bff' }

function CalendarComponent() {
    const {
        selected, month, year, transactionData, filteredTransaction,
        totalIncome, totalExpense, totalAmount,
        setSelected, setMonth, setYear,
        setTotalIncome, setTotalExpense, setTotalAmout,
        groupTransactionOnMonthChange
    } = useContext(CalendarScreenContext);

    // sử dụng usememo để tính toán lại date được đánh dấu và thêm các thuộc tính: date nào có input tiền chi/thu
    // useMemo: gần tương tự useState, nhưng không cần setState, dùng để tối ưu hiệu suất bằng cách ghi nhớ (memorize) giá trị được tính toán, 
    // để tránh việc tính toán lại không cần thiết mỗi lần component render.
    const mergeMarkedDateData = useMemo<MarkedDates>((): MarkedDates => {
        // khởi tạo giá trị trả về
        const markedDateData: MarkedDates = {};
        console.log('abc')

        // lấy data từ async storage và lặp qua từng phần tử
        transactionData.map((transaction: any) => {
            const key = transaction.date.split('T')[0];
            const dot = transaction.category.type == 'expense' ? expenseDot : incomeDot;

            // kiểm tra date đã được khởi tạo hay chưa
            if (markedDateData[key]) {
                if (!markedDateData[key].dots?.some(d => d.key === dot.key)) markedDateData[key].dots?.push(dot);
            } else {// chưa được khởi tạo => tạo data mới của đối tượng markedDateData
                // thêm giá trị dot tương ứng vào data (expense/income)
                markedDateData[key] = {
                    marked: true,
                    dots: [transaction.category.type == 'expense' ? expenseDot : incomeDot],
                    activeOpacity: 0
                }
            }
        });

        // kiểm tra người dùng thay đổi selected => thêm thuộc tính => thay đổi giao diện
        if (markedDateData[selected]) {
            markedDateData[selected] = {
                ...markedDateData[selected],
                selected: true,
                disableTouchEvent: true,
            }
        } else {
            markedDateData[selected] = {
                selected: true,
                disableTouchEvent: true,
            }
        }

        return markedDateData
    }, [transactionData, selected]);

    return (
        <Calendar
            // theme={{
            //     backgroundColor: 'yellow',
            //     calendarBackground: 'yellow',
            //     textSectionTitleColor: 'red',
            //     todayTextColor: 'lime',
            //     dayTextColor: 'blue',
            // }}
            markingType={'multi-dot'}
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            onMonthChange={(day) => {
                setMonth(day.month);
                setYear(day.year);
            }}
            markedDates={mergeMarkedDateData}
        />
    )
}

export default CalendarComponent