-- MindWave playable soundscape seed data for Java/MySQL backends.
-- Import this file into the application database, then expose audio_url as audioUrl to the mobile client.

CREATE TABLE IF NOT EXISTS soundscapes (
  id VARCHAR(64) NOT NULL,
  name VARCHAR(64) NOT NULL,
  tag VARCHAR(64) NOT NULL,
  category VARCHAR(32) NOT NULL,
  duration_seconds INT NOT NULL,
  paid TINYINT(1) NOT NULL DEFAULT 0,
  tone CHAR(7) NOT NULL,
  audio_url VARCHAR(512) NOT NULL,
  description VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_soundscapes_name (name),
  KEY idx_soundscapes_category_enabled (category, enabled, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO soundscapes (
  id,
  name,
  tag,
  category,
  duration_seconds,
  paid,
  tone,
  audio_url,
  description,
  sort_order,
  enabled
) VALUES
  (
    'bamboo-wind',
    '竹林风声',
    '编辑推荐 · 东方专区',
    '东方',
    1680,
    0,
    '#0F6E56',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    '低饱和远山与轻风，适合傍晚复位与深呼吸。',
    10,
    1
  ),
  (
    'morning-bamboo',
    '晨雾竹林',
    '晨间冥想',
    '自然',
    1080,
    0,
    '#0F6E56',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    '竹叶和远钟慢慢拉开一天的边界。',
    20,
    1
  ),
  (
    'deep-brown-noise',
    '棕噪深工',
    '深度专注',
    '专注',
    2700,
    0,
    '#607D8B',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    '稳定低频帮助进入长时间心流。',
    30,
    1
  ),
  (
    'rain-reading',
    '雨夜阅读',
    '深度专注',
    '混音',
    2700,
    0,
    '#D98A60',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    '雨声、壁炉和翻书声组合成柔和背景。',
    40,
    1
  ),
  (
    'bamboo-mindfulness',
    '竹林正念',
    '正念混音',
    '混音',
    1680,
    0,
    '#4F7F73',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    '竹叶、颂钵与远钟为呼吸练习留出空间。',
    50,
    1
  ),
  (
    'tea-room',
    '茶室煮水',
    '东方声景',
    '东方',
    1920,
    1,
    '#8D6E58',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    '水沸、茶盏与微弱木质回响。',
    60,
    1
  ),
  (
    'distant-stream',
    '远山溪流',
    '减压放松',
    '自然',
    1800,
    0,
    '#4F7F73',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    '溪流与山风适合傍晚复位。',
    70,
    1
  ),
  (
    'midnight-rain',
    '深夜雨声',
    '睡眠助眠',
    '睡眠',
    3600,
    0,
    '#455A64',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    '低亮度雨声，适合睡前淡出。',
    80,
    1
  ),
  (
    'temple-bells',
    '晨钟暮鼓',
    '东方声景',
    '东方',
    1440,
    1,
    '#0F6E56',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    '钟声与鼓点保持很低的存在感。',
    90,
    1
  ),
  (
    'white-noise-sleep',
    '白噪入眠',
    '睡眠助眠',
    '睡眠',
    3600,
    0,
    '#607D8B',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    '均匀白噪音帮助睡前屏蔽环境干扰。',
    100,
    1
  )
ON DUPLICATE KEY UPDATE
  tag = VALUES(tag),
  category = VALUES(category),
  duration_seconds = VALUES(duration_seconds),
  paid = VALUES(paid),
  tone = VALUES(tone),
  audio_url = VALUES(audio_url),
  description = VALUES(description),
  sort_order = VALUES(sort_order),
  enabled = VALUES(enabled);

CREATE TABLE IF NOT EXISTS soundscape_mixes (
  id VARCHAR(64) NOT NULL,
  name VARCHAR(64) NOT NULL,
  formula VARCHAR(255) NOT NULL,
  soundscape_id VARCHAR(64) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  enabled TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_soundscape_mixes_enabled (enabled, sort_order),
  CONSTRAINT fk_soundscape_mixes_soundscape
    FOREIGN KEY (soundscape_id) REFERENCES soundscapes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO soundscape_mixes (
  id,
  name,
  formula,
  soundscape_id,
  sort_order,
  enabled
) VALUES
  (
    'rain-reading-mix',
    '雨夜阅读',
    '雨声 60% + 壁炉 25% + 翻书声 15%',
    'rain-reading',
    10,
    1
  ),
  (
    'bamboo-mindfulness',
    '竹林正念',
    '竹叶 45% + 颂钵 35% + 远钟 20%',
    'bamboo-mindfulness',
    20,
    1
  )
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  formula = VALUES(formula),
  soundscape_id = VALUES(soundscape_id),
  sort_order = VALUES(sort_order),
  enabled = VALUES(enabled);
