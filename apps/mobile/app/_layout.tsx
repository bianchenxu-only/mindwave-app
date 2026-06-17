import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import { CapsuleTabBar } from '@/components/capsule-tab-bar';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(outline: IconName, filled: IconName) {
  return function TabIcon({ color, focused, size }: { color: string; focused: boolean; size: number }) {
    return <Ionicons name={focused ? filled : outline} color={color} size={size - 2} />;
  };
}

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <CapsuleTabBar {...props} />}
      screenOptions={{
        headerShown: false,
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
    </Tabs>
  );
}
