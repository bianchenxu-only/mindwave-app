import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS, type IconName } from "@/constants/mindwave";
import { useMindWaveStore } from "@/stores/use-mindwave-store";

const preferenceRows: {
  description: string;
  icon: IconName;
  key: "haptics" | "mindfulReminders" | "privateMode" | "sleepFadeOut";
  title: string;
}[] = [
  {
    key: "mindfulReminders",
    title: "正念提醒",
    description: "在早晚和长时间工作后给出温柔提醒。",
    icon: "notifications-outline",
  },
  {
    key: "sleepFadeOut",
    title: "睡眠淡出",
    description: "助眠声景会在设定时间内自动降低音量。",
    icon: "moon-outline",
  },
  {
    key: "haptics",
    title: "轻触反馈",
    description: "重要操作提供轻微触感反馈。",
    icon: "phone-portrait-outline",
  },
  {
    key: "privateMode",
    title: "隐私模式",
    description: "树洞记录和情绪标签仅保留在本机。",
    icon: "lock-closed-outline",
  },
];

const supportRows: { description: string; icon: IconName; title: string }[] = [
  {
    title: "会员状态",
    description: "MindWave Plus 试用中 · 还剩 12 天",
    icon: "sparkles-outline",
  },
  {
    title: "数据导出",
    description: "导出专注、睡眠与声景收藏摘要",
    icon: "download-outline",
  },
  {
    title: "帮助与反馈",
    description: "提交问题或查看常见解答",
    icon: "help-circle-outline",
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, toggleSetting } = useMindWaveStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.roundButton}
            accessibilityLabel="返回"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color={COLORS.moss} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>Preferences</Text>
            <Text style={styles.title}>设置</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.avatar}>
            <Ionicons name="leaf-outline" size={28} color={COLORS.surface} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>林间</Text>
            <Text style={styles.heroCopy}>
              已开启隐私优先体验，所有原型功能使用本地状态演示。
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>偏好设置</Text>
        </View>
        <View style={styles.cardList}>
          {preferenceRows.map((row) => {
            const enabled = settings[row.key];

            return (
              <Pressable
                key={row.key}
                style={styles.settingRow}
                accessibilityLabel={row.title}
                onPress={() => toggleSetting(row.key)}
              >
                <View style={styles.rowIcon}>
                  <Ionicons name={row.icon} size={19} color={COLORS.moss} />
                </View>
                <View style={styles.rowCopy}>
                  <Text style={styles.rowTitle}>{row.title}</Text>
                  <Text style={styles.rowDescription}>{row.description}</Text>
                </View>
                <View
                  style={[styles.switchTrack, enabled && styles.switchTrackOn]}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      enabled && styles.switchThumbOn,
                    ]}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>账户与支持</Text>
        </View>
        <View style={styles.cardList}>
          {supportRows.map((row) => (
            <Pressable
              key={row.title}
              style={styles.settingRow}
              accessibilityLabel={row.title}
              onPress={() => Alert.alert(row.title, row.description)}
            >
              <View style={styles.rowIcon}>
                <Ionicons name={row.icon} size={19} color={COLORS.moss} />
              </View>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTitle}>{row.title}</Text>
                <Text style={styles.rowDescription}>{row.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.dangerRow}
          accessibilityLabel="清空树洞记录"
          onPress={() =>
            Alert.alert(
              "清空树洞记录",
              "当前原型不会真正删除数据；正式版会二次确认后执行。",
            )
          }
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.orange} />
          <Text style={styles.dangerText}>清空树洞记录</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  roundButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: COLORS.surface,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: COLORS.muted,
    fontSize: 12,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    color: COLORS.ink,
    fontSize: 30,
    fontWeight: "300",
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 30,
    backgroundColor: COLORS.moss,
    padding: 20,
    marginBottom: 24,
  },
  avatar: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 31,
    backgroundColor: "rgba(248, 248, 246, 0.16)",
  },
  heroText: {
    flex: 1,
  },
  heroTitle: {
    color: COLORS.surface,
    fontSize: 21,
    fontWeight: "500",
  },
  heroCopy: {
    color: "rgba(248, 248, 246, 0.78)",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: "500",
  },
  cardList: {
    gap: 12,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  rowIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: COLORS.mossSoft,
  },
  rowCopy: {
    flex: 1,
  },
  rowTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "500",
  },
  rowDescription: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  switchTrack: {
    width: 48,
    height: 28,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#E8E2DA",
    paddingHorizontal: 3,
  },
  switchTrackOn: {
    backgroundColor: COLORS.moss,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.surface,
  },
  switchThumbOn: {
    alignSelf: "flex-end",
  },
  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    backgroundColor: "#F3E2D8",
    paddingVertical: 14,
  },
  dangerText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "500",
  },
});
