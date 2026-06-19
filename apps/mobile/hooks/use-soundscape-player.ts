import { Audio } from "expo-av";
import { useEffect, useRef } from "react";

import { useMindWaveStore } from "@/stores/use-mindwave-store";

export function useSoundscapePlayer() {
  const { isPlaying, track } = useMindWaveStore();
  const soundRef = useRef<Audio.Sound | null>(null);
  const trackIdRef = useRef<string | null>(null);

  useEffect(() => {
    void Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
    });

    return () => {
      const sound = soundRef.current;
      soundRef.current = null;
      trackIdRef.current = null;

      if (sound) {
        void sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function syncPlayback() {
      const currentSound = soundRef.current;

      if (!isPlaying) {
        if (currentSound) {
          await currentSound.pauseAsync();
        }
        return;
      }

      if (currentSound && trackIdRef.current === track.id) {
        await currentSound.playAsync();
        return;
      }

      if (currentSound) {
        await currentSound.unloadAsync();
        soundRef.current = null;
        trackIdRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.audioUrl },
        { isLooping: true, shouldPlay: true },
      );

      if (cancelled) {
        await sound.unloadAsync();
        return;
      }

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded && status.error) {
          console.warn("Soundscape playback failed", status.error);
        }
      });
      soundRef.current = sound;
      trackIdRef.current = track.id;
    }

    void syncPlayback().catch((error) => {
      console.warn("Unable to sync soundscape playback", error);
    });

    return () => {
      cancelled = true;
    };
  }, [isPlaying, track.audioUrl, track.id]);
}
