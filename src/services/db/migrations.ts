/**
 * Vids Database Migrations
 * IndexedDB version upgrades via Dexie
 */

import type Dexie from 'dexie'

/**
 * Run all migrations
 * Each version adds new tables or modifies existing ones
 */
export function setupMigrations(db: Dexie): void {
    // Version 1: Initial schema
    db.version(1).stores({
        subscriptions: 'id, channelId, folderId, updatedAt, syncStatus',
        folders: 'id, parentId, name, updatedAt, syncStatus',
        videoCache: 'videoId, channelId, publishedAt, cachedAt',
        watchHistory: 'id, videoId, watchedAt, completed, updatedAt, syncStatus',
        playlists: 'id, folderId, isWatchLater, isFavorites, updatedAt, syncStatus',
        playlistVideos: 'id, playlistId, videoId, [playlistId+order]',
        notifications: 'id, type, read, createdAt',
        syncMetadata: 'deviceId',
    })

    // Future versions can be added here:
    // db.version(2).stores({...}).upgrade(tx => {...})
}
