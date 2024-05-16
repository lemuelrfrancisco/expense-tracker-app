import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        headerStyle: { backgroundColor: 'dodgerblue' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: 'white' },
        tabBarActiveTintColor: 'dodgerblue',
        tabBarInactiveTintColor: 'white',
        tabBarInactiveBackgroundColor: 'dodgerblue',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Manage Expenses',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'add'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='all-expenses'
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'hourglass'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='recent-expense'
        options={{
          title: 'Recent Expense',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'calendar'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

