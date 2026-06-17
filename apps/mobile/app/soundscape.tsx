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

const categories = ['推荐', '全部', '混音', '自然', '东方', '我的收藏'];

const soundscapes = [
  { name: '晨钟暮鼓', tag: '东方声景', duration: '24 分钟', paid: true, tone: '#0F6E56' },
  { name: '雨夜阅读', tag: '深度专注', duration: '45 分钟', paid: false, tone: '#D98A60' },
  { name: '茶室煮水', tag: '东方声景', duration: '32 分钟', paid: true, tone: '#8D6E58' },
  { name: '白噪入眠', tag: '睡眠助眠', duration: '60 分钟', paid: false, tone: '#607D8B' },
];

const mixes = [
  { name: '雨夜阅读', formula: '雨声 60% + 壁炉 25% + 翻书声 15%' },
  { name: '竹林正念', formula: '竹叶 45% + 颂钵 35% + 远钟 20%' },
];

const toolItems: { label: string; icon: IconName }[] = [
  { label: '打卡', icon: 'checkmark-circle-outline' },
  { label: '收藏', icon: 'heart-outline' },
  { label: '计时器', icon: 'time-outline' },
  { label: '混音', icon: 'options-outline' },
];

export default function SoundscapeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Soundscape</Text>
            <Text style={styles.title}>声景空间</Text>
          </View>
          <Pressable style={styles.roundButton} accessibilityLabel="声音漫游">
            <Ionicons name="shuffle-outline" size={20} color={COLORS.moss} />
          </Pressable>
        </View>

        <Pressable style={styles.hero} accessibilityLabel="播放编辑推荐声景">
          <View style={styles.heroImage}>
            <View style={styles.heroMist} />
            <Ionicons name="play" size={28} color={COLORS.surface} />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroKicker}>编辑推荐 · 东方专区</Text>
            <Text style={styles.heroTitle}>竹林风声</Text>
            <Text style={styles.heroCopy}>低饱和远山与轻风，适合傍晚复位与深呼吸。</Text>
          </View>
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}>
          {categories.map((category, index) => (
            <Pressable
              key={category}
              style={[styles.categoryPill, index === 0 && styles.categoryPillActive]}
              accessibilityLabel={`切换到${category}分类`}>
              <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>为此刻准备</Text>
          <Text style={styles.sectionAction}>35 个 MVP 声景</Text>
        </View>

        <View style={styles.grid}>
          {soundscapes.map((item) => (
            <Pressable key={item.name} style={styles.card} accessibilityLabel={`播放${item.name}`}>
              <View style={[styles.cardImage, { backgroundColor: item.tone }]}>
                <View style={styles.cardImageOverlay} />
                <Ionicons name="musical-note" size={22} color={COLORS.surface} />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  {item.paid ? (
                    <View style={styles.paidTag}>
                      <Text style={styles.paidText}>会员</Text>
                    </View>
                  ) : (
                    <View style={styles.freeTag}>
                      <Text style={styles.freeText}>免费</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardMeta}>
                  {item.tag} · {item.duration}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.mixerPanel}>
          <View style={styles.mixerHeader}>
            <View>
              <Text style={styles.mixerKicker}>Mix Studio</Text>
              <Text style={styles.mixerTitle}>多轨混音台</Text>
            </View>
            <Ionicons name="options-outline" size={24} color={COLORS.moss} />
          </View>
          {mixes.map((mix) => (
            <View key={mix.name} style={styles.mixRow}>
              <View style={styles.mixIcon}>
                <Ionicons name="radio-outline" size={18} color={COLORS.moss} />
              </View>
              <View style={styles.mixText}>
                <Text style={styles.mixName}>{mix.name}</Text>
                <Text style={styles.mixFormula}>{mix.formula}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.playerSheet}>
          <Text style={styles.playerTitle}>播放页工具栏预览</Text>
          <View style={styles.toolRow}>
            {toolItems.map((item) => (
              <View key={item.label} style={styles.toolItem}>
                <Ionicons name={item.icon} size={20} color={COLORS.moss} />
                <Text style={styles.toolLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
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
  hero: {
    overflow: 'hidden',
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  heroImage: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.moss,
  },
  heroMist: {
    position: 'absolute',
    left: -30,
    top: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(248, 248, 246, 0.16)',
  },
  heroText: {
    padding: 20,
  },
  heroKicker: {
    color: COLORS.moss,
    fontSize: 12,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.ink,
    fontSize: 24,
    fontWeight: '400',
  },
  heroCopy: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  categoryList: {
    gap: 10,
    paddingRight: 20,
    marginBottom: 22,
  },
  categoryPill: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  categoryPillActive: {
    backgroundColor: COLORS.moss,
    borderColor: COLORS.moss,
  },
  categoryText: {
    color: COLORS.muted,
    fontSize: 13,
  },
  categoryTextActive: {
    color: COLORS.surface,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '48%',
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  cardImage: {
    height: 118,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImageOverlay: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(248, 248, 246, 0.14)',
  },
  cardBody: {
    padding: 14,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '500',
  },
  cardMeta: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 7,
  },
  paidTag: {
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
    backgroundColor: '#F3E2D8',
  },
  paidText: {
    color: COLORS.orange,
    fontSize: 10,
  },
  freeTag: {
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
    backgroundColor: COLORS.mossSoft,
  },
  freeText: {
    color: COLORS.moss,
    fontSize: 10,
  },
  mixerPanel: {
    borderRadius: 28,
    backgroundColor: '#EDE2D5',
    padding: 20,
    marginBottom: 18,
  },
  mixerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mixerKicker: {
    color: COLORS.moss,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 5,
  },
  mixerTitle: {
    color: COLORS.ink,
    fontSize: 21,
    fontWeight: '400',
  },
  mixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 248, 246, 0.58)',
    padding: 12,
    marginTop: 10,
  },
  mixIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: COLORS.mossSoft,
  },
  mixText: {
    flex: 1,
  },
  mixName: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '500',
  },
  mixFormula: {
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  playerSheet: {
    borderRadius: 28,
    backgroundColor: COLORS.surface,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  playerTitle: {
    color: COLORS.ink,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 14,
  },
  toolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolItem: {
    minWidth: 58,
    alignItems: 'center',
    gap: 6,
  },
  toolLabel: {
    color: COLORS.muted,
    fontSize: 11,
  },
});
