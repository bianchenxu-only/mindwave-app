import { Ionicons } from '@expo/vector-icons';
import { useState, type ComponentProps, type ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import FocusScreen from './apps/mobile/app/focus';
import HomeScreen from './apps/mobile/app/index';
import ProfileScreen from './apps/mobile/app/profile';
import SoundscapeScreen from './apps/mobile/app/soundscape';

type IconName = ComponentProps<typeof Ionicons>['name'];
type TabKey = 'home' | 'soundscape' | 'focus' | 'profile';

type TabItem = {
  component: ComponentType;
  icon: IconName;
  key: TabKey;
  label: string;
  selectedIcon: IconName;
};

const COLORS = {
  bar: '#F8F8F6',
  active: '#E3EEE8',
  activeText: '#0F6E56',
  inactiveText: 'rgba(51, 58, 66, 0.52)',
  shadow: '#333A42',
};

const TABS: TabItem[] = [
  {
    component: HomeScreen,
    icon: 'sparkles-outline',
    key: 'home',
    label: '现在',
    selectedIcon: 'sparkles',
  },
  {
    component: SoundscapeScreen,
    icon: 'musical-notes-outline',
    key: 'soundscape',
    label: '声景',
    selectedIcon: 'musical-notes',
  },
  {
    component: FocusScreen,
    icon: 'timer-outline',
    key: 'focus',
    label: '专注',
    selectedIcon: 'timer',
  },
  {
    component: ProfileScreen,
    icon: 'person-outline',
    key: 'profile',
    label: '我的',
    selectedIcon: 'person',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const currentTab = TABS.find((tab) => tab.key === activeTab) ?? TABS[0];
  const ActiveScreen = currentTab.component;

  return (
    <View style={styles.app}>
      <ActiveScreen />
      <View pointerEvents="box-none" style={styles.tabBarWrapper}>
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const selected = tab.key === activeTab;

            return (
              <Pressable
                accessibilityLabel={`切换到${tab.label}`}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tabItem, selected && styles.tabItemActive]}>
                <Ionicons
                  color={selected ? COLORS.activeText : COLORS.inactiveText}
                  name={selected ? tab.selectedIcon : tab.icon}
                  size={selected ? 23 : 21}
                />
                <Text style={[styles.tabLabel, selected && styles.tabLabelActive]}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  tabBarWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 22,
    left: 0,
  },
  tabBar: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 34,
    backgroundColor: COLORS.bar,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderRadius: 26,
  },
  tabItemActive: {
    backgroundColor: COLORS.active,
  },
  tabLabel: {
    color: COLORS.inactiveText,
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: COLORS.activeText,
  },
});
