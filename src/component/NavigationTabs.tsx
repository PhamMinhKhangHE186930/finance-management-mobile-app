import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalenderScreen from '../screens/CalendarScreen';
import HomeScreen from '../screens/HomeScreen';
import OtherScreen from '../screens/OtherScreen';
import StatisticScreen from '../screens/StatisticScreen';

// khai bao Tab
const Tab = createBottomTabNavigator();

function NavigationTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: true,}}>
        <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Trang chủ',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='create-outline' size={size} color={color} />
                )
            }}
        />
        <Tab.Screen
            name='Calendar'
            component={CalenderScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Lịch',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='calendar-outline' size={size} color={color} />
                )
            }}
        />
        <Tab.Screen
            name='Statistic'
            component={StatisticScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Báo cáo',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='pie-chart-outline' size={size} color={color} />
                )
            }}
        />
        <Tab.Screen
            name='Other'
            component={OtherScreen}
            options={{
                headerShown: false,
                tabBarLabel: 'Khác',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='ellipsis-horizontal-outline' size={size} color={color} />
                )
            }}
        />
    </Tab.Navigator>
  )
}

export default NavigationTabs