import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(outline: IconName, filled: IconName) {
  return function TabIcon({ color, focused, size }: { color: string; focused: boolean; size: number }) {
    return <Ionicons name={focused ? filled : outline} color={color} size={size - 2} />;
  };
}

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0F6E56',
        tabBarInactiveTintColor: 'rgba(51, 58, 66, 0.52)',
        tabBarActiveBackgroundColor: '#E3EEE8',
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 22,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          borderRadius: 34,
          backgroundColor: '#F8F8F6',
          shadowColor: '#333A42',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 12,
        },
        tabBarItemStyle: {
          marginHorizontal: 5,
          borderRadius: 26,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '现在',
          tabBarIcon: tabIcon('sparkles-outline', 'sparkles'),
        }}
      />
      <Tabs.Screen
        name="soundscape"
        options={{
          title: '声景',
          tabBarIcon: tabIcon('musical-notes-outline', 'musical-notes'),
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: '专注',
          tabBarIcon: tabIcon('timer-outline', 'timer'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: tabIcon('person-outline', 'person'),
        }}
      />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="modal" options={{ href: null }} />
      <Tabs.Screen name="(tabs)" options={{ href: null }} />
    </Tabs>
  );
}