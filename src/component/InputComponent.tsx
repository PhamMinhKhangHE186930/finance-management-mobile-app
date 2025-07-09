import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HomeScreenContext } from '../context/HomeScreenContext';
import { formatDate } from '../utils/formatter';
import CategorySelect from './CategorySelect';


function InputComponent() {
    const {
        date, note, amountInput, amounText, categories, selectedCategory, amountType,
        setDate, setNote, setAmountInput,
        setAmountText, setCategories, setSelectedCategory,
        handleSaveTransaction, setPreviousDate, setAfterDate,
        handleChangeText, handelSelectCategory
    } = useContext(HomeScreenContext);

    const [mode, setMode] = useState<'date' | 'time' | 'datetime'>('date');
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate || new Date());
    };

    const showMode = (currentMode: "date" | "time" | "datetime") => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <ScrollView>
            <View>
                {/* input date */}
                <View style={styles.dateCell}>
                    <Text style={styles.dateText}>Ngày</Text>

                    <TouchableOpacity style={styles.prevNextDate} onPress={setPreviousDate}>
                        <Ionicons name="chevron-back-outline" size={30}></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                        <Text style={[styles.backgroundInput, styles.dateInput]}>{formatDate('vi-VN', date)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.prevNextDate} onPress={setAfterDate}>
                        <Ionicons name="chevron-forward-outline" size={30}></Ionicons>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
                <View style={styles.separator} />

                {/* note input */}
                <View style={styles.dateCell}>
                    <Text style={styles.noteLabel}>Ghi chú</Text>
                    <TextInput style={styles.noteInput}
                        placeholder='Chưa nhập vào'
                        placeholderTextColor={'rgb(144,144,134)'}
                        value={note}
                        onChangeText={setNote} />
                </View>

                <View style={styles.separator} />

                {/* spend money input */}
                <View style={styles.dateCell}>
                    <Text style={styles.noteLabel}>{amountType == 'expense' ? 'Tiền chi' : 'Tiền thu'}</Text>
                    <TextInput style={[styles.amountInput, styles.backgroundInput]}
                        placeholder='0'
                        keyboardType='numeric'
                        value={amounText}
                        onChangeText={handleChangeText} />
                    <Text style={styles.valueAmount}>đ</Text>
                </View>
                <View style={styles.separator} />

                {/* category select component */}
                <CategorySelect data={categories} selectedCategory={selectedCategory} handelSelectCategory={handelSelectCategory} />

                {/* submit button */}
                <View style={{
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#007bff',
                            borderRadius: 9999,
                            width: '80%',
                            paddingVertical: 5,
                        }}
                        onPress={handleSaveTransaction}
                    >
                        <Text style={{
                            color: '#f1f1f1',
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}
                        >Hoàn thành</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default InputComponent;

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
    dateText: {
        fontSize: 21,
        flex: 2,
        // textAlign: 'center'
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
    noteLabel: {
        fontSize: 21,
        flex: 3,
        // textAlign: 'center'
    },
    noteInput: {
        fontSize: 20,
        flex: 7,
    },
    amountInput: {
        fontSize: 20,
        flex: 6,
    },
    valueAmount: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center'
    },
})