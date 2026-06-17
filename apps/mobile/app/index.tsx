import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
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

import {
  COLORS,
  HOME_HABITS,
  QUICK_ACTIONS,
  findSoundscapeByName,
  type SoundscapeItem,
} from "@/constants/mindwave";
import { useMindWaveStore } from "@/stores/use-mindwave-store";

const timeContexts = [
  {
    start: 5,
    end: 9,
    greeting: "早安",
    sceneType: "晨间冥想 / 专注启动 / 呼吸练习",
    recommendations: ["晨雾竹林", "专注启动", "三分钟呼吸"],
  },
  {
    start: 10,
    end: 12,
    greeting: "上午好",
    sceneType: "深度工作 / 专注阅读",
    recommendations: ["棕噪深工", "雨夜阅读", "咖啡馆低语"],
  },
  {
    start: 13,
    end: 14,
    greeting: "午好",
    sceneType: "午休小憩",
    recommendations: ["微风午睡", "溪流短憩", "轻柔鸟鸣"],
  },
  {
    start: 15,
    end: 18,
    greeting: "下午好",
    sceneType: "专注工作 / 轻松背景",
    recommendations: ["键盘白噪", "壁炉阅读", "粉噪灵感"],
  },
  {
    start: 19,
    end: 22,
    greeting: "傍晚好",
    sceneType: "减压放松 / 冥想 / 瑜伽",
    recommendations: ["远山溪流", "暮色颂钵", "茶室煮水"],
  },
  {
    start: 23,
    end: 4,
    greeting: "夜深了",
    sceneType: "助眠 / 睡眠故事 / 白噪音",
    recommendations: ["深夜雨声", "白噪入眠", "海浪慢呼吸"],
  },
];

function getTimeContext() {
  const hour = new Date().getHours();

  return (
    timeContexts.find((item) =>
      item.start <= item.end
        ? hour >= item.start && hour <= item.end
        : hour >= item.start || hour <= item.end,
    ) ?? timeContexts[0]
  );
}

function getRecommendationTrack(name: string, index: number): SoundscapeItem {
  return (
    findSoundscapeByName(name) ?? {
      id: `recommendation-${name}`,
      name,
      tag: index === 0 ? "此刻推荐" : "MindWave 推荐",
      category: "推荐",
      duration: index === 0 ? "18 分钟" : "30 分钟",
      paid: false,
      tone: index === 1 ? COLORS.orange : COLORS.moss,
      description: "根据当前时段自动挑选的轻量声景。",
    }
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const context = getTimeContext();
  const [quoteExpanded, setQuoteExpanded] = useState(false);
  const {
    homeHabits,
    isPlaying,
    playTrack,
    toggleHomeHabit,
    togglePlayback,
    track,
  } = useMindWaveStore();
  const completedHabits = HOME_HABITS.filter(
    (habit) => homeHabits[habit],
  ).length;

  const shareQuote = async () => {
    await Share.share({
      message:
        "允许自己慢一点。雾会散开，水面也会在无人催促时，重新映出光。—— MindWave 今日心语",
    });
  };

  const openSleepReport = () => {
    Alert.alert(
      "昨夜睡眠报告",
      "睡眠得分 82，雨声让入睡速度快了 12 分钟。完整趋势已放入「我的」页。",
      [
        { text: "稍后查看" },
        { text: "查看成长洞察", onPress: () => router.push("/profile") },
      ],
    );
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
            <Text style={styles.eyebrow}>MindWave · 现在</Text>
            <Text style={styles.title}>{context.greeting}，林间</Text>
          </View>
          <Pressable
            style={styles.iconButton}
            accessibilityLabel="打开通知"
            onPress={() =>
              Alert.alert("正念提醒", "今晚 22:30 会提醒你开启睡前放松。")
            }
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={COLORS.ink}
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.quoteCard, quoteExpanded && styles.quoteCardExpanded]}
          accessibilityLabel="展开今日心语"
          onPress={() => setQuoteExpanded((value) => !value)}
        >
          <View style={styles.quoteOrb} />
          <View style={styles.quoteContent}>
            <Text style={styles.quoteLabel}>今日心语 · 小满</Text>
            <Text style={styles.quote}>
              允许自己慢一点。雾会散开，水面也会在无人催促时，重新映出光。
            </Text>
            {quoteExpanded ? (
              <Text style={styles.quoteDetail}>
                给自己三次缓慢呼吸：吸气 4 秒，停留 2 秒，呼气 6 秒。
              </Text>
            ) : null}
            <View style={styles.quoteFooter}>
              <Text style={styles.quoteSource}>AI 生成 · 温柔支持基调</Text>
              <Pressable
                accessibilityLabel="分享今日心语"
                hitSlop={10}
                onPress={shareQuote}
              >
                <Ionicons name="share-outline" size={18} color={COLORS.moss} />
              </Pressable>
            </View>
          </View>
        </Pressable>

        <View style={styles.metricsRow}>
          <Pressable
            style={[styles.metricCard, styles.sleepCard]}
            accessibilityLabel="查看昨夜睡眠报告"
            onPress={openSleepReport}
          >
            <Text style={styles.metricLabel}>昨夜睡眠</Text>
            <View style={styles.metricMain}>
              <Text style={styles.metricValue}>82</Text>
              <Text style={styles.metricUnit}>分</Text>
            </View>
            <Text style={styles.metricHint}>雨声让入睡速度快了 12 分钟</Text>
          </Pressable>

          <View style={styles.metricCard} accessibilityLabel="进入今日打卡进度">
            <Text style={styles.metricLabel}>今日打卡</Text>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(completedHabits / HOME_HABITS.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.metricHint}>
              已完成 {completedHabits}/{HOME_HABITS.length} ·{" "}
              {completedHabits === HOME_HABITS.length
                ? "今日已完成"
                : "晚间还差一步"}
            </Text>
            <View style={styles.habitPills}>
              {HOME_HABITS.map((habit) => {
                const done = homeHabits[habit];

                return (
                  <Pressable
                    key={habit}
                    style={[styles.habitPill, done && styles.habitPillDone]}
                    accessibilityLabel={`${habit}打卡`}
                    onPress={() => toggleHomeHabit(habit)}
                  >
                    <Ionicons
                      name={done ? "checkmark-circle" : "ellipse-outline"}
                      size={12}
                      color={done ? COLORS.moss : COLORS.muted}
                    />
                    <Text
                      style={[
                        styles.habitPillText,
                        done && styles.habitPillTextDone,
                      ]}
                    >
                      {habit}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>此刻推荐场景</Text>
            <Text style={styles.sectionSubtitle}>{context.sceneType}</Text>
          </View>
          <Text style={styles.sectionAction}>最多 5 个</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sceneList}
        >
          {context.recommendations.map((item, index) => (
            <Pressable
              key={item}
              style={[
                styles.sceneCard,
                track.name === item && styles.sceneCardActive,
              ]}
              accessibilityLabel={`播放${item}`}
              onPress={() => playTrack(getRecommendationTrack(item, index))}
            >
              <View
                style={[
                  styles.sceneVisual,
                  index === 1 && styles.sceneVisualAlt,
                ]}
              >
                <Ionicons
                  name={track.name === item && isPlaying ? "pause" : "play"}
                  size={20}
                  color={COLORS.surface}
                />
              </View>
              <Text style={styles.sceneTitle}>{item}</Text>
              <Text style={styles.sceneMeta}>
                {index === 0 ? "18 分钟 · 免费" : "30 分钟 · 推荐"}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          style={styles.treeHole}
          accessibilityLabel="进入情绪树洞"
          onPress={() =>
            Alert.alert(
              "情绪树洞",
              "树洞记录功能已准备好：当前版本会先在本机安全保存你的输入草稿。",
            )
          }
        >
          <View>
            <Text style={styles.treeHoleTitle}>今天怎么了？</Text>
            <Text style={styles.treeHoleText}>
              一个无评判的安全空间，先把心里的话放下来。
            </Text>
          </View>
          <View style={styles.treeHoleIcon}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color={COLORS.surface}
            />
          </View>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>快捷功能</Text>
        </View>
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.title}
              style={styles.quickCard}
              accessibilityLabel={action.title}
              onPress={() => router.push(action.route)}
            >
              <View style={styles.quickIcon}>
                <Ionicons name={action.icon} size={20} color={COLORS.moss} />
              </View>
              <Text style={styles.quickTitle}>{action.title}</Text>
              <Text style={styles.quickSubtitle}>{action.subtitle}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.player}
          accessibilityLabel="切换播放状态"
          onPress={togglePlayback}
        >
          <View style={styles.playerArtwork}>
            <Ionicons name="musical-note" size={18} color={COLORS.surface} />
          </View>
          <View style={styles.playerText}>
            <Text style={styles.playerTitle}>
              {isPlaying ? "正在播放" : "已暂停"} · {track.name}
            </Text>
            <Text style={styles.playerSubtitle}>
              {track.tag} · {track.duration}
            </Text>
          </View>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={22}
            color={COLORS.moss}
          />
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
    letterSpacing: 0.4,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: COLORS.surface,
  },
  quoteCard: {
    minHeight: 208,
    overflow: "hidden",
    borderRadius: 32,
    backgroundColor: "#EDE2D5",
    marginBottom: 16,
  },
  quoteCardExpanded: {
    minHeight: 248,
  },
  quoteOrb: {
    position: "absolute",
    top: -64,
    right: -34,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(15, 110, 86, 0.18)",
  },
  quoteContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  quoteLabel: {
    color: COLORS.moss,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 26,
  },
  quote: {
    color: COLORS.ink,
    fontSize: 22,
    lineHeight: 34,
    fontWeight: "300",
  },
  quoteDetail: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 16,
  },
  quoteFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  quoteSource: {
    color: COLORS.muted,
    fontSize: 12,
  },
  metricsRow: {
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    borderRadius: 26,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  sleepCard: {
    backgroundColor: "#F0E7DC",
  },
  metricLabel: {
    color: COLORS.muted,
    fontSize: 13,
    marginBottom: 10,
  },
  metricMain: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  metricValue: {
    color: COLORS.moss,
    fontSize: 42,
    fontWeight: "300",
  },
  metricUnit: {
    color: COLORS.moss,
    fontSize: 15,
  },
  metricHint: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E8E2DA",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.moss,
  },
  habitPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  habitPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: "#F1EDE7",
  },
  habitPillDone: {
    backgroundColor: COLORS.mossSoft,
  },
  habitPillText: {
    color: COLORS.muted,
    fontSize: 11,
  },
  habitPillTextDone: {
    color: COLORS.moss,
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
  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  sectionAction: {
    color: COLORS.moss,
    fontSize: 12,
  },
  sceneList: {
    gap: 12,
    paddingRight: 20,
    marginBottom: 24,
  },
  sceneCard: {
    width: 150,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  sceneCardActive: {
    borderColor: COLORS.moss,
    backgroundColor: COLORS.mossSoft,
  },
  sceneVisual: {
    height: 104,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: COLORS.moss,
    marginBottom: 12,
  },
  sceneVisualAlt: {
    backgroundColor: COLORS.orange,
  },
  sceneTitle: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: "500",
  },
  sceneMeta: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  treeHole: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    borderRadius: 999,
    backgroundColor: COLORS.moss,
    paddingVertical: 16,
    paddingLeft: 22,
    paddingRight: 12,
    marginBottom: 24,
  },
  treeHoleTitle: {
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 3,
  },
  treeHoleText: {
    color: "rgba(248, 248, 246, 0.78)",
    fontSize: 12,
    lineHeight: 17,
    maxWidth: 240,
  },
  treeHoleIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: "rgba(248, 248, 246, 0.16)",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickCard: {
    width: "48%",
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  quickIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: COLORS.mossSoft,
    marginBottom: 18,
  },
  quickTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "500",
  },
  quickSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginTop: 22,
  },
  playerArtwork: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: COLORS.moss,
  },
  playerText: {
    flex: 1,
  },
  playerTitle: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: "500",
  },
  playerSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 3,
  },
});
