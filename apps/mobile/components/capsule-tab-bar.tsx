import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  bar: '#F8F8F6',
  active: '#E3EEE8',
  activeText: '#0F6E56',
  inactiveText: 'rgba(51, 58, 66, 0.52)',
  shadow: '#333A42',
};

const TAB_ANIMATION_MS = 200;

type TabRoute = BottomTabBarProps['state']['routes'][number];
type TabDescriptor = BottomTabBarProps['descriptors'][string];

type CapsuleTabItemProps = {
  descriptor: TabDescriptor;
  focused: boolean;
  onLongPress: () => void;
  onPress: () => void;
  route: TabRoute;
};

function getTabLabel(route: TabRoute, descriptor: TabDescriptor) {
  const { options } = descriptor;

  if (typeof options.tabBarLabel === 'string') {
    return options.tabBarLabel;
  }

  if (typeof options.title === 'string') {
    return options.title;
  }

  return route.name;
}

function CapsuleTabItem({ descriptor, focused, onLongPress, onPress, route }: CapsuleTabItemProps) {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;
  const { options } = descriptor;
  const label = getTabLabel(route, descriptor);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: focused ? 1 : 0,
      duration: TAB_ANIMATION_MS,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [focused, progress]);

  const itemStyle = {
    backgroundColor: progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(227, 238, 232, 0)', COLORS.active],
    }),
    transform: [
      {
        scale: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.06],
        }),
      },
    ],
  };

  const labelStyle = {
    color: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.inactiveText, COLORS.activeText],
    }),
  };

  return (
    <Animated.View style={[styles.itemShell, focused && styles.itemShellFocused, itemStyle]}>
      <Pressable
        accessibilityLabel={options.tabBarAccessibilityLabel}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        android_ripple={{ color: 'rgba(15, 110, 86, 0.08)', borderless: false }}
        onLongPress={onLongPress}
        onPress={onPress}
        style={styles.item}>
        {options.tabBarIcon?.({
          color: focused ? COLORS.activeText : COLORS.inactiveText,
          focused,
          size: focused ? 23 : 21,
        })}
        <Animated.Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

export function CapsuleTabBar({ descriptors, navigation, state }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const visibleRoutes = state.routes.filter((route) => descriptors[route.key]?.options.href !== null);
  const bottomOffset = Math.max(insets.bottom, 10) + 12;

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: bottomOffset }]}>
      <View style={styles.bar}>
        {visibleRoutes.map((route) => {
          const descriptor = descriptors[route.key];
          const focused = state.routes[state.index]?.key === route.key;

          const onPress = () => {
            const event = navigation.emit({
              canPreventDefault: true,
              target: route.key,
              type: 'tabPress',
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              target: route.key,
              type: 'tabLongPress',
            });
          };

          return (
            <CapsuleTabItem
              descriptor={descriptor}
              focused={focused}
              key={route.key}
              onLongPress={onLongPress}
              onPress={onPress}
              route={route}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bar: {
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
  itemShell: {
    flex: 1,
    height: 52,
    overflow: 'hidden',
    borderRadius: 26,
  },
  itemShellFocused: {
    zIndex: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderRadius: 26,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
