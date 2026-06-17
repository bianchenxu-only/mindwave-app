import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  CATEGORY_FILTERS,
  COLORS,
  FEATURED_SCENE,
  MIXES,
  SOUNDSCAPES,
  findSoundscapeByName,
  type CategoryFilter,
  type IconName,
} from "@/constants/mindwave";
import { useMindWaveStore } from "@/stores/use-mindwave-store";

const toolItems: { label: string; icon: IconName }[] = [
  { label: "打卡", icon: "checkmark-circle-outline" },
  { label: "收藏", icon: "heart-outline" },
  { label: "计时器", icon: "time-outline" },
  { label: "混音", icon: "options-outline" },
];

export default function SoundscapeScreen() {
  const {
    category,
    checkedInSoundscapeIds,
    favoriteSoundscapeIds,
    isPlaying,
    playTrack,
    selectCategory,
    shuffleTrack,
    toggleFavorite,
    track,
    checkInSoundscape,
  } = useMindWaveStore();

  const visibleSoundscapes = useMemo(() => {
    if (category === "全部") {
      return SOUNDSCAPES;
    }

    if (category === "我的收藏") {
      return SOUNDSCAPES.filter((item) =>
        favoriteSoundscapeIds.includes(item.id),
      );
    }

    if (category === "推荐") {
      return SOUNDSCAPES.slice(0, 4);
    }

    return SOUNDSCAPES.filter((item) => item.category === category);
  }, [category, favoriteSoundscapeIds]);

  const runToolAction = (label: string) => {
    if (label === "打卡") {
      checkInSoundscape(track.id);
      Alert.alert("声景打卡完成", `已记录「${track.name}」的本次聆听。`);
      return;
    }

    if (label === "收藏") {
      toggleFavorite(track.id);
      return;
    }

    Alert.alert(
      label,
      label === "计时器"
        ? "已沿用当前声景的淡出定时。"
        : "混音台已载入当前声景。",
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
            <Text style={styles.eyebrow}>Soundscape</Text>
            <Text style={styles.title}>声景空间</Text>
          </View>
          <Pressable
            style={styles.roundButton}
            accessibilityLabel="声音漫游"
            onPress={() => shuffleTrack(category)}
          >
            <Ionicons name="shuffle-outline" size={20} color={COLORS.moss} />
          </Pressable>
        </View>

        <Pressable
          style={[
            styles.hero,
            track.id === FEATURED_SCENE.id && styles.heroActive,
          ]}
          accessibilityLabel="播放编辑推荐声景"
          onPress={() => playTrack(FEATURED_SCENE)}
        >
          <View
            style={[styles.heroImage, { backgroundColor: FEATURED_SCENE.tone }]}
          >
            <View style={styles.heroMist} />
            <Ionicons
              name={
                track.id === FEATURED_SCENE.id && isPlaying ? "pause" : "play"
              }
              size={28}
              color={COLORS.surface}
            />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.heroKicker}>{FEATURED_SCENE.tag}</Text>
            <Text style={styles.heroTitle}>{FEATURED_SCENE.name}</Text>
            <Text style={styles.heroCopy}>{FEATURED_SCENE.description}</Text>
          </View>
        </Pressable>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORY_FILTERS.map((item) => {
            const active = item === category;

            return (
              <Pressable
                key={item}
                style={[
                  styles.categoryPill,
                  active && styles.categoryPillActive,
                ]}
                accessibilityLabel={`切换到${item}分类`}
                onPress={() => selectCategory(item as CategoryFilter)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>为此刻准备</Text>
          <Text style={styles.sectionAction}>
            {visibleSoundscapes.length} 个可播放
          </Text>
        </View>

        <View style={styles.grid}>
          {visibleSoundscapes.map((item) => {
            const active = track.id === item.id;
            const favorite = favoriteSoundscapeIds.includes(item.id);

            return (
              <Pressable
                key={item.id}
                style={[styles.card, active && styles.cardActive]}
                accessibilityLabel={`播放${item.name}`}
                onPress={() => playTrack(item)}
              >
                <View
                  style={[styles.cardImage, { backgroundColor: item.tone }]}
                >
                  <View style={styles.cardImageOverlay} />
                  <Ionicons
                    name={active && isPlaying ? "pause" : "musical-note"}
                    size={22}
                    color={COLORS.surface}
                  />
                </View>
                <View style={styles.cardBody}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Pressable
                      accessibilityLabel={`${favorite ? "取消收藏" : "收藏"}${item.name}`}
                      hitSlop={10}
                      onPress={() => toggleFavorite(item.id)}
                    >
                      <Ionicons
                        name={favorite ? "heart" : "heart-outline"}
                        size={17}
                        color={favorite ? COLORS.orange : COLORS.muted}
                      />
                    </Pressable>
                  </View>
                  <Text style={styles.cardMeta}>
                    {item.tag} · {item.duration}
                  </Text>
                  <View style={styles.cardFooter}>
                    <View style={item.paid ? styles.paidTag : styles.freeTag}>
                      <Text
                        style={item.paid ? styles.paidText : styles.freeText}
                      >
                        {item.paid ? "会员" : "免费"}
                      </Text>
                    </View>
                    {checkedInSoundscapeIds.includes(item.id) ? (
                      <Text style={styles.checkInText}>已打卡</Text>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.mixerPanel}>
          <View style={styles.mixerHeader}>
            <View>
              <Text style={styles.mixerKicker}>Mix Studio</Text>
              <Text style={styles.mixerTitle}>多轨混音台</Text>
            </View>
            <Ionicons name="options-outline" size={24} color={COLORS.moss} />
          </View>
          {MIXES.map((mix) => (
            <Pressable
              key={mix.id}
              style={styles.mixRow}
              accessibilityLabel={`载入${mix.name}混音`}
              onPress={() => {
                const mixedTrack = findSoundscapeByName(mix.name);
                if (mixedTrack) {
                  playTrack(mixedTrack, "混音方案已加载");
                }
              }}
            >
              <View style={styles.mixIcon}>
                <Ionicons name="radio-outline" size={18} color={COLORS.moss} />
              </View>
              <View style={styles.mixText}>
                <Text style={styles.mixName}>{mix.name}</Text>
                <Text style={styles.mixFormula}>{mix.formula}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.playerSheet}>
          <Text style={styles.playerTitle}>当前声景 · {track.name}</Text>
          <View style={styles.toolRow}>
            {toolItems.map((item) => (
              <Pressable
                key={item.label}
                style={styles.toolItem}
                accessibilityLabel={`${item.label}${track.name}`}
                onPress={() => runToolAction(item.label)}
              >
                <Ionicons
                  name={
                    item.label === "收藏" &&
                    favoriteSoundscapeIds.includes(track.id)
                      ? "heart"
                      : item.icon
                  }
                  size={20}
                  color={COLORS.moss}
                />
                <Text style={styles.toolLabel}>{item.label}</Text>
              </Pressable>
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
  hero: {
    overflow: "hidden",
    borderRadius: 32,
    backgroundColor: COLORS.surface,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  heroActive: {
    borderColor: COLORS.moss,
  },
  heroImage: {
    height: 170,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.moss,
  },
  heroMist: {
    position: "absolute",
    left: -30,
    top: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(248, 248, 246, 0.16)",
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
    fontWeight: "400",
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: "48%",
    overflow: "hidden",
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  cardActive: {
    borderColor: COLORS.moss,
    backgroundColor: COLORS.mossSoft,
  },
  cardImage: {
    height: 118,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImageOverlay: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(248, 248, 246, 0.14)",
  },
  cardBody: {
    padding: 14,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: "500",
  },
  cardMeta: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 7,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkInText: {
    color: COLORS.moss,
    fontSize: 10,
  },
  paidTag: {
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
    backgroundColor: "#F3E2D8",
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
    backgroundColor: "#EDE2D5",
    padding: 20,
    marginBottom: 18,
  },
  mixerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "400",
  },
  mixRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 20,
    backgroundColor: "rgba(248, 248, 246, 0.58)",
    padding: 12,
    marginTop: 10,
  },
  mixIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: COLORS.mossSoft,
  },
  mixText: {
    flex: 1,
  },
  mixName: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "500",
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
    fontWeight: "500",
    marginBottom: 14,
  },
  toolRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toolItem: {
    minWidth: 58,
    alignItems: "center",
    gap: 6,
  },
  toolLabel: {
    color: COLORS.muted,
    fontSize: 11,
  },
});
