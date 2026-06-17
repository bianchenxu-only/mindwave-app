import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS, type IconName } from "@/constants/mindwave";
import { useMindWaveStore } from "@/stores/use-mindwave-store";

const insightCards = [
  {
    label: "情绪曲线",
    value: "平静上升",
    note: "最近 7 天焦虑标签减少 18%",
    icon: "pulse-outline",
  },
  {
    label: "睡眠趋势",
    value: "82 分均值",
    note: "本周最佳：周二雨声入眠",
    icon: "moon-outline",
  },
  {
    label: "专注统计",
    value: "8.5h",
    note: "最高效时段 10:00-12:00",
    icon: "bar-chart-outline",
  },
] satisfies { label: string; value: string; note: string; icon: IconName }[];

const achievements = [
  { name: "初心", icon: "leaf-outline", active: true },
  { name: "七日之约", icon: "moon-outline", active: true },
  { name: "三周之约", icon: "trail-sign-outline", active: false },
  { name: "声音探索家", icon: "ear-outline", active: false },
] satisfies { name: string; icon: IconName; active: boolean }[];

const libraryItems = [
  {
    title: "我的声景",
    subtitle: "12 个收藏 · 2 个混音方案",
    icon: "musical-notes-outline",
  },
  { title: "历史语句", subtitle: "最近 30 天今日心语", icon: "book-outline" },
  {
    title: "树洞记录",
    subtitle: "端到端加密，可随时清空",
    icon: "lock-closed-outline",
  },
] satisfies { title: string; subtitle: string; icon: IconName }[];

export default function ProfileScreen() {
  const router = useRouter();
  const { checkedInSoundscapeIds, favoriteSoundscapeIds, track } =
    useMindWaveStore();
  const favoriteCount = favoriteSoundscapeIds.length;
  const checkInCount = checkedInSoundscapeIds.length;

  const shareMilestone = async () => {
    await Share.share({
      message: `我已经和 MindWave 相遇 48 天，最近正在听「${track.name}」。`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Growth Archive</Text>
            <Text style={styles.title}>我的</Text>
          </View>
          <Pressable
            style={styles.roundButton}
            accessibilityLabel="打开设置"
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="settings-outline" size={20} color={COLORS.moss} />
          </Pressable>
        </View>

        <View style={styles.companionCard}>
          <Text style={styles.companionLabel}>与 MindWave 相遇的第</Text>
          <View style={styles.companionMain}>
            <Text style={styles.companionDays}>48</Text>
            <Text style={styles.companionUnit}>天</Text>
          </View>
          <Text style={styles.companionCopy}>
            你已经为自己留下 28 次专注、{favoriteCount} 个声景收藏和{" "}
            {checkInCount} 次聆听打卡。
          </Text>
          <View style={styles.timeline}>
            {["首次打开", "7 日打卡", "深夜陪伴", "今日"].map((item, index) => (
              <View key={item} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineDot,
                    index <= 2 && styles.timelineDotDone,
                  ]}
                />
                <Text style={styles.timelineText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.shopEntry}
          accessibilityLabel="进入生活方式选物"
          onPress={() =>
            Alert.alert(
              "生活方式选物",
              "选物入口已开启：后续会根据声景场景展示香氛、茶饮与睡眠小物。",
            )
          }
        >
          <View style={styles.shopIcon}>
            <Ionicons name="sparkles-outline" size={20} color={COLORS.orange} />
          </View>
          <View style={styles.shopText}>
            <Text style={styles.shopTitle}>生活方式选物</Text>
            <Text style={styles.shopSubtitle}>
              低调入口，和声景场景相互呼应
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={COLORS.orange} />
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>成长洞察</Text>
          <Text style={styles.sectionAction}>7 / 30 / 90 天</Text>
        </View>
        <View style={styles.insightList}>
          {insightCards.map((card) => (
            <Pressable
              key={card.label}
              style={styles.insightCard}
              accessibilityLabel={card.label}
              onPress={() =>
                Alert.alert(card.label, `${card.value}\n${card.note}`)
              }
            >
              <View style={styles.insightIcon}>
                <Ionicons name={card.icon} size={20} color={COLORS.moss} />
              </View>
              <View style={styles.insightBody}>
                <Text style={styles.insightLabel}>{card.label}</Text>
                <Text style={styles.insightValue}>{card.value}</Text>
                <Text style={styles.insightNote}>{card.note}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>成就系统</Text>
          <Text style={styles.sectionAction}>10 枚徽章</Text>
        </View>
        <View style={styles.achievementGrid}>
          {achievements.map((achievement) => (
            <Pressable
              key={achievement.name}
              style={[
                styles.achievementCard,
                !achievement.active && styles.achievementLocked,
              ]}
              accessibilityLabel={achievement.name}
              onPress={() =>
                Alert.alert(
                  achievement.active ? "已解锁成就" : "成就未解锁",
                  achievement.active
                    ? `你已经获得「${achievement.name}」。`
                    : `继续打卡即可解锁「${achievement.name}」。`,
                )
              }
            >
              <View
                style={[
                  styles.achievementIcon,
                  achievement.active && styles.achievementIconActive,
                ]}
              >
                <Ionicons
                  name={achievement.icon}
                  size={22}
                  color={achievement.active ? COLORS.surface : COLORS.muted}
                />
              </View>
              <Text
                style={[
                  styles.achievementName,
                  !achievement.active && styles.achievementNameLocked,
                ]}
              >
                {achievement.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.shareCard}>
          <View>
            <Text style={styles.shareKicker}>里程碑分享</Text>
            <Text style={styles.shareTitle}>7 天成就卡已生成</Text>
            <Text style={styles.shareCopy}>
              1080 × 1920 竖版图片，仅保留小字 App 标识。
            </Text>
          </View>
          <Pressable
            style={styles.shareButton}
            accessibilityLabel="预览分享卡片"
            onPress={shareMilestone}
          >
            <Ionicons name="share-outline" size={18} color={COLORS.surface} />
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>我的收藏</Text>
        </View>
        <View style={styles.libraryList}>
          {libraryItems.map((item) => (
            <Pressable
              key={item.title}
              style={styles.libraryItem}
              accessibilityLabel={item.title}
              onPress={() => {
                if (item.title === "我的声景") {
                  router.push("/soundscape");
                  return;
                }

                Alert.alert(item.title, item.subtitle);
              }}
            >
              <View style={styles.libraryIcon}>
                <Ionicons name={item.icon} size={19} color={COLORS.moss} />
              </View>
              <View style={styles.libraryCopy}>
                <Text style={styles.libraryTitle}>{item.title}</Text>
                <Text style={styles.librarySubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </Pressable>
          ))}
        </View>
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
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
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
  roundButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: COLORS.surface,
  },
  companionCard: {
    overflow: "hidden",
    borderRadius: 34,
    backgroundColor: COLORS.moss,
    padding: 24,
    marginBottom: 14,
  },
  companionLabel: {
    color: "rgba(248, 248, 246, 0.72)",
    fontSize: 13,
  },
  companionMain: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 8,
  },
  companionDays: {
    color: COLORS.surface,
    fontSize: 76,
    fontWeight: "200",
    letterSpacing: -1,
  },
  companionUnit: {
    color: COLORS.surface,
    fontSize: 18,
  },
  companionCopy: {
    color: "rgba(248, 248, 246, 0.78)",
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
  },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  timelineItem: {
    alignItems: "center",
    gap: 7,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(248, 248, 246, 0.24)",
  },
  timelineDotDone: {
    backgroundColor: COLORS.surface,
  },
  timelineText: {
    color: "rgba(248, 248, 246, 0.72)",
    fontSize: 11,
  },
  shopEntry: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 24,
    backgroundColor: "#F3E2D8",
    padding: 14,
    marginBottom: 24,
  },
  shopIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 21,
    backgroundColor: "rgba(217, 138, 96, 0.14)",
  },
  shopText: {
    flex: 1,
  },
  shopTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "500",
  },
  shopSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: "500",
  },
  sectionAction: {
    color: COLORS.moss,
    fontSize: 12,
  },
  insightList: {
    gap: 12,
    marginBottom: 24,
  },
  insightCard: {
    flexDirection: "row",
    gap: 14,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  insightIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: COLORS.mossSoft,
  },
  insightBody: {
    flex: 1,
  },
  insightLabel: {
    color: COLORS.muted,
    fontSize: 12,
  },
  insightValue: {
    color: COLORS.ink,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 4,
  },
  insightNote: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  achievementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  achievementCard: {
    width: "48%",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  achievementLocked: {
    opacity: 0.58,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#E8E2DA",
    marginBottom: 10,
  },
  achievementIconActive: {
    backgroundColor: COLORS.moss,
  },
  achievementName: {
    color: COLORS.ink,
    fontSize: 13,
    fontWeight: "500",
  },
  achievementNameLocked: {
    color: COLORS.muted,
  },
  shareCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    borderRadius: 28,
    backgroundColor: "#EDE2D5",
    padding: 20,
    marginBottom: 24,
  },
  shareKicker: {
    color: COLORS.moss,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 7,
  },
  shareTitle: {
    color: COLORS.ink,
    fontSize: 19,
    fontWeight: "500",
  },
  shareCopy: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    maxWidth: 230,
  },
  shareButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: COLORS.moss,
  },
  libraryList: {
    gap: 12,
  },
  libraryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  libraryIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: COLORS.mossSoft,
  },
  libraryCopy: {
    flex: 1,
  },
  libraryTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "500",
  },
  librarySubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
});
