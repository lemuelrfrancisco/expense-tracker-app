import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import IconButton from '../../../components/UI/IconButton';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        headerStyle: { backgroundColor: 'dodgerblue' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarInactiveBackgroundColor: 'dodgerblue',
        tabBarStyle: {
          backgroundColor: 'dodgerblue',
          bottom: 0,
        },
        headerStyle: {
          backgroundColor: 'dodgerblue',
        },
        headerTintColor: 'white',
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('manage-expenses');
            }}
          />
        ),
      })}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: true,
          title: 'Recent Expenses',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'hourglass'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='all-expenses'
        options={{
          headerShown: true,
          title: 'All Expenses',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'calendar'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

