/**
 * Database Schema Types
 * TypeScript interfaces for IndexedDB tables
 */

export type SyncStatus = 'synced' | 'pending' | 'conflict'

// ==================== SUBSCRIPTIONS ====================

export interface ChannelFilters {
    minDuration: number | null
    maxDuration: number | null
    excludeKeywords: string[]
    includeKeywords: string[]
    excludeShorts: boolean
    excludeLives: boolean
}

export interface Subscription {
    id: string
    channelId: string
    channelName: string
    channelAvatar: string
    folderId: string | null
    playbackSpeed: number
    filters: ChannelFilters
    subscribedAt: Date
    updatedAt: Date
    syncStatus: SyncStatus
}

// ==================== FOLDERS ====================

export interface FolderFilters {
    minDuration: number | null
    maxDuration: number | null
    minLikeRatio: number | null
    maxAge: number | null
}

export interface Folder {
    id: string
    name: string
    parentId: string | null
    color: string
    icon: string
    filters: FolderFilters
    homeEnabled: boolean
    order: number
    createdAt: Date
    updatedAt: Date
    syncStatus: SyncStatus
}

// ==================== VIDEOS ====================

export type SponsorCategory =
    | 'sponsor'
    | 'selfpromo'
    | 'interaction'
    | 'intro'
    | 'outro'
    | 'preview'
    | 'filler'
    | 'music_offtopic'

export interface Chapter {
    title: string
    startTime: number
    thumbnailUrl: string | null
}

export interface SponsorSegment {
    startTime: number
    endTime: number
    category: SponsorCategory
    actionType: 'skip' | 'mute' | 'full'
}

export interface VideoCache {
    videoId: string
    title: string
    titleDeArrow: string | null
    channelId: string
    channelName: string
    description: string
    duration: number
    publishedAt: Date
    thumbnailUrl: string
    thumbnailDeArrow: string | null
    viewCount: number
    likeCount: number
    dislikeCount: number
    commentCount: number
    transcript: string | null
    chapters: Chapter[]
    sponsorSegments: SponsorSegment[]
    cachedAt: Date
    expiresAt: Date
}

// ==================== WATCH HISTORY ====================

export interface WatchHistory {
    id: string
    videoId: string
    watchedAt: Date
    durationWatched: number
    totalDuration: number
    completed: boolean
    rating: 'like' | 'dislike' | null
    playbackSpeed: number
    updatedAt: Date
    syncStatus: SyncStatus
}

// ==================== PLAYLISTS ====================

export interface Playlist {
    id: string
    name: string
    description: string
    folderId: string | null
    isWatchLater: boolean
    isFavorites: boolean
    thumbnailUrl: string | null
    videoCount: number
    totalDuration: number
    createdAt: Date
    updatedAt: Date
    syncStatus: SyncStatus
}

export interface PlaylistVideo {
    id: string
    playlistId: string
    videoId: string
    order: number
    addedAt: Date
}

// ==================== NOTIFICATIONS ====================

export type NotificationType =
    | 'new_video'
    | 'channel_update'
    | 'playlist_update'
    | 'system'

export interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    videoId: string | null
    channelId: string | null
    read: boolean
    createdAt: Date
}

// ==================== SYNC ====================

export interface SyncMetadata {
    deviceId: string
    lastSyncAt: Date
    syncEnabled: boolean
}
