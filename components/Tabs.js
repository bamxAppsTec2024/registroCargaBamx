import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Registro from '../screens/Registro';
import Historial from '../screens/Historial';
import { Octicons, MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFD600',
        tabBarInactiveTintColor: '#E2E2E2',
        tabBarStyle: {
          backgroundColor: '#DF405C',
          height: 70,
          
        },
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom:10
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Registro"
        component={Registro}
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="diff-added"
              size={35}
              color={focused ? '#FFD600' : '#E2E2E2'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="history"
              size={40}
              color={focused ? '#FFD600' : '#E2E2E2'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;