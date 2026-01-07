-- =============================================
-- Vids - Initial Database Schema
-- Version: 001
-- =============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For full-text search

-- ==================== AUTH (Lucia) ====================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- ==================== FOLDERS ====================

CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  color VARCHAR(7) DEFAULT '#7c7cf5',
  icon VARCHAR(50) DEFAULT 'folder',
  filters JSONB DEFAULT '{}',
  home_enabled BOOLEAN DEFAULT false,
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name, parent_id)
);

CREATE INDEX IF NOT EXISTS idx_folders_user_id ON folders(user_id);

-- ==================== SUBSCRIPTIONS ====================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  channel_id VARCHAR(50) NOT NULL,
  channel_name VARCHAR(255) NOT NULL,
  channel_avatar TEXT,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  playback_speed FLOAT DEFAULT 1.0,
  filters JSONB DEFAULT '{}',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, channel_id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_channel_id ON subscriptions(channel_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_folder_id ON subscriptions(folder_id);

-- ==================== VIDEO CACHE ====================

CREATE TABLE IF NOT EXISTS video_cache (
  video_id VARCHAR(20) PRIMARY KEY,
  title TEXT NOT NULL,
  title_dearrow TEXT,
  channel_id VARCHAR(50) NOT NULL,
  channel_name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT NOT NULL,
  published_at TIMESTAMPTZ,
  thumbnail_url TEXT,
  thumbnail_dearrow TEXT,
  view_count BIGINT DEFAULT 0,
  like_count INT DEFAULT 0,
  dislike_count INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  transcript TEXT,
  chapters JSONB DEFAULT '[]',
  sponsor_segments JSONB DEFAULT '[]',
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
);

CREATE INDEX IF NOT EXISTS idx_video_cache_channel_id ON video_cache(channel_id);
CREATE INDEX IF NOT EXISTS idx_video_cache_expires_at ON video_cache(expires_at);
CREATE INDEX IF NOT EXISTS idx_video_cache_transcript ON video_cache USING gin(to_tsvector('english', transcript));

-- ==================== WATCH HISTORY ====================

CREATE TABLE IF NOT EXISTS watch_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  video_id VARCHAR(20) NOT NULL,
  watched_at TIMESTAMPTZ DEFAULT NOW(),
  duration_watched INT DEFAULT 0,
  total_duration INT NOT NULL,
  completed BOOLEAN DEFAULT false,
  rating VARCHAR(10) CHECK (rating IN ('like', 'dislike', NULL)),
  playback_speed FLOAT DEFAULT 1.0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_watch_history_user_id ON watch_history(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_video_id ON watch_history(video_id);
CREATE INDEX IF NOT EXISTS idx_watch_history_watched_at ON watch_history(watched_at DESC);

-- ==================== PLAYLISTS ====================

CREATE TABLE IF NOT EXISTS playlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  is_watch_later BOOLEAN DEFAULT false,
  is_favorites BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  video_count INT DEFAULT 0,
  total_duration INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_playlists_user_id ON playlists(user_id);

CREATE TABLE IF NOT EXISTS playlist_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  playlist_id UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  video_id VARCHAR(20) NOT NULL,
  "order" INT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(playlist_id, video_id)
);

CREATE INDEX IF NOT EXISTS idx_playlist_videos_playlist_id ON playlist_videos(playlist_id);

-- ==================== NOTIFICATIONS ====================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  video_id VARCHAR(20),
  channel_id VARCHAR(50),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
