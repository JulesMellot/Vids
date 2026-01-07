/**
 * Vids Database - IndexedDB via Dexie
 * Main database instance for offline-first storage
 */

import Dexie, { type Table } from 'dexie'
import { setupMigrations } from './migrations'
import type {
    Subscription,
    Folder,
    VideoCache,
    WatchHistory,
    Playlist,
    PlaylistVideo,
    Notification,
    SyncMetadata,
} from './schema'

class VidsDatabase extends Dexie {
    // Table declarations
    subscriptions!: Table<Subscription>
    folders!: Table<Folder>
    videoCache!: Table<VideoCache>
    watchHistory!: Table<WatchHistory>
    playlists!: Table<Playlist>
    playlistVideos!: Table<PlaylistVideo>
    notifications!: Table<Notification>
    syncMetadata!: Table<SyncMetadata>

    constructor() {
        super('VidsDB')

        // Apply migrations
        setupMigrations(this)
    }
}

// Singleton database instance
export const db = new VidsDatabase()

// Re-export types for convenience
export type {
    Subscription,
    Folder,
    VideoCache,
    WatchHistory,
    Playlist,
    PlaylistVideo,
    Notification,
    SyncMetadata,
} from './schema'

export default db
