// apps/mobile/app/_layout.tsx
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* 首页 Tab */}
      <Tabs.Screen
        name="index" // 对应 index.tsx
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <Text style={{color}}>🏠</Text>, // 暂时用Emoji代替图标
        }}
      />

      {/* 设置页 Tab */}
      <Tabs.Screen
        name="settings" // 对应 settings.tsx
        options={{
          title: '设置',
          tabBarIcon: ({ color }) => <Text style={{color}}>⚙️</Text>,
        }}
      />
    </Tabs>
  );
}