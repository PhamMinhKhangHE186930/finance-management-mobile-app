import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ICategory } from '../dataset/category'

function CategorySelect({ data, selectedCategory, handelSelectCategory }: { data: ICategory[], selectedCategory: string, handelSelectCategory: (id: string) => void }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh mục</Text>
            <View style={styles.categoryList}>
                {data.map(item => (
                    <View key={item._id} style={styles.view}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { borderColor: selectedCategory == item._id ? 'rgb(255, 137, 0)' : 'rgb(154, 153, 153)', }
                            ]}
                            key={item._id}
                            onPress={() => handelSelectCategory(item._id)}
                        >
                            <Ionicons name={item.categoryIcon as any} color={item.color} size={31} />
                            <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default CategorySelect;

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 10,
    },
    categoryList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    view: {
        flexBasis: '31%', // giống width nhưng tốt hơn cho wrap
        marginVertical: 5,
    },
    button: {
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    title: {
        fontSize: 25
    },
})