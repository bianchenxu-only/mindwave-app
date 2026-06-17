import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

type IconName = ComponentProps<typeof Ionicons>['name'];

const COLORS = {
  background: '#F4F0EA',
  surface: '#F8F8F6',
  ink: '#333A42',
  muted: 'rgba(51, 58, 66, 0.62)',
  moss: '#0F6E56',
  mossSoft: '#E3EEE8',
  orange: '#D98A60',
  line: 'rgba(51, 58, 66, 0.1)',
};

const modes = ['标准番茄', '自定义', '自由计时', '倒计时'];

const habits = [
  { name: '每日阅读', target: '60 分钟', streak: '连续 12 天', progress: 0.72 },
  { name: '晨间冥想', target: '15 分钟', streak: '连续 7 天', progress: 1 },
  { name: '睡前放松', target: '30 分钟', streak: '第 3 天', progress: 0.35 },
];

const weeklyStats = [
  { label: '本周专注', value: '8.5h', icon: 'hourglass-outline' },
  { label: '完成率', value: '86%', icon: 'checkmark-done-outline' },
  { label: '最高效', value: '10:00', icon: 'sunny-outline' },
] satisfies { label: string; value: string; icon: IconName }[];

export default function FocusScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Focus Engine</Text>
            <Text style={styles.title}>专注引擎</Text>
          </View>
          <Pressable style={styles.roundButton} accessibilityLabel="新增任务备注">
            <Ionicons name="create-outline" size={20} color={COLORS.moss} />
          </Pressable>
        </View>

        <View style={styles.timerCard}>
          <View style={styles.timerAura} />
          <View style={styles.timerCircle}>
            <Text style={styles.timerValue}>25:00</Text>
            <Text style={styles.timerLabel}>标准番茄 · 专注阶段</Text>
          </View>
          <Pressable style={styles.startButton} accessibilityLabel="开始专注">
            <Ionicons name="play" size={18} color={COLORS.surface} />
            <Text style={styles.startText}>进入心流</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modeList}>
          {modes.map((mode, index) => (
            <Pressable
              key={mode}
              style={[styles.modePill, index === 0 && styles.modePillActive]}
              accessibilityLabel={`选择${mode}模式`}>
              <Text style={[styles.modeText, index === 0 && styles.modeTextActive]}>{mode}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.linkedSoundscape}>
          <View style={styles.soundscapeIcon}>
            <Ionicons name="musical-notes-outline" size={22} color={COLORS.moss} />
          </View>
          <View style={styles.soundscapeCopy}>
            <Text style={styles.soundscapeTitle}>已联动声景 · 棕噪深工</Text>
            <Text style={styles.soundscapeText}>休息阶段会自动切换为轻松放松声景，计时不中断。</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>习惯打卡</Text>
          <Text style={styles.sectionAction}>基础版</Text>
        </View>

        <View style={styles.habitList}>
          {habits.map((habit) => (
            <Pressable key={habit.name} style={styles.habitCard} accessibilityLabel={`${habit.name}打卡`}>
              <View style={styles.habitTop}>
                <View>
                  <Text style={styles.habitName}>{habit.name}</Text>
                  <Text style={styles.habitMeta}>
                    {habit.target} · {habit.streak}
                  </Text>
                </View>
                <View style={[styles.statusDot, habit.progress >= 1 && styles.statusDotDone]} />
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${habit.progress * 100}%` }]} />
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <View>
              <Text style={styles.planKicker}>21 天计划</Text>
              <Text style={styles.planTitle}>深度阅读 · Day 9</Text>
            </View>
            <Text style={styles.planStage}>巩固期</Text>
          </View>
          <View style={styles.planTimeline}>
            {Array.from({ length: 21 }).map((_, index) => (
              <View
                key={index}
                style={[styles.planDay, index < 9 && styles.planDayDone, index === 8 && styles.planDayCurrent]}
              />
            ))}
          </View>
          <Text style={styles.planCopy}>今天解锁「雨夜阅读」进阶引导语，完成后生成中期回顾图。</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>本周报告</Text>
        </View>
        <View style={styles.statsRow}>
          {weeklyStats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Ionicons name={stat.icon} size={18} color={COLORS.moss} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontWeight: '300',
  },
  roundButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.surface,
  },
  timerCard: {
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 34,
    backgroundColor: COLORS.surface,
    paddingVertical: 32,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  timerAura: {
    position: 'absolute',
    top: 24,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: COLORS.mossSoft,
  },
  timerCircle: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(15, 110, 86, 0.2)',
    backgroundColor: 'rgba(248, 248, 246, 0.72)',
  },
  timerValue: {
    color: COLORS.ink,
    fontSize: 58,
    fontWeight: '200',
    letterSpacing: 1,
  },
  timerLabel: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 8,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    backgroundColor: COLORS.moss,
    paddingHorizontal: 24,
    paddingVertical: 13,
    marginTop: 24,
  },
  startText: {
    color: COLORS.surface,
    fontSize: 15,
    fontWeight: '500',
  },
  modeList: {
    gap: 10,
    paddingRight: 20,
    marginBottom: 18,
  },
  modePill: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  modePillActive: {
    backgroundColor: COLORS.moss,
    borderColor: COLORS.moss,
  },
  modeText: {
    color: COLORS.muted,
    fontSize: 13,
  },
  modeTextActive: {
    color: COLORS.surface,
  },
  linkedSoundscape: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 26,
    backgroundColor: '#EDE2D5',
    padding: 16,
    marginBottom: 24,
  },
  soundscapeIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.mossSoft,
  },
  soundscapeCopy: {
    flex: 1,
  },
  soundscapeTitle: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '500',
  },
  soundscapeText: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.ink,
    fontSize: 20,
    fontWeight: '500',
  },
  sectionAction: {
    color: COLORS.moss,
    fontSize: 12,
  },
  habitList: {
    gap: 12,
    marginBottom: 24,
  },
  habitCard: {
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  habitTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  habitName: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '500',
  },
  habitMeta: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.orange,
  },
  statusDotDone: {
    backgroundColor: COLORS.moss,
  },
  progressTrack: {
    height: 8,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#E8E2DA',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.moss,
  },
  planCard: {
    borderRadius: 28,
    backgroundColor: COLORS.moss,
    padding: 20,
    marginBottom: 24,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  planKicker: {
    color: 'rgba(248, 248, 246, 0.72)',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 6,
  },
  planTitle: {
    color: COLORS.surface,
    fontSize: 22,
    fontWeight: '400',
  },
  planStage: {
    overflow: 'hidden',
    borderRadius: 999,
    color: COLORS.surface,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(248, 248, 246, 0.14)',
  },
  planTimeline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  planDay: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(248, 248, 246, 0.22)',
  },
  planDayDone: {
    backgroundColor: COLORS.surface,
  },
  planDayCurrent: {
    backgroundColor: COLORS.orange,
  },
  planCopy: {
    color: 'rgba(248, 248, 246, 0.78)',
    fontSize: 13,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  statValue: {
    color: COLORS.ink,
    fontSize: 19,
    fontWeight: '500',
    marginTop: 10,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
  },
});
