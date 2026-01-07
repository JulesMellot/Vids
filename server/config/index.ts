/**
 * Server Configuration
 * Environment variables and app settings
 */

export const config = {
    port: parseInt(process.env.PORT ?? '3001', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',

    // CORS settings
    cors: {
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
        credentials: true,
    },

    // Database (for later)
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        name: process.env.DB_NAME ?? 'vids',
        user: process.env.DB_USER ?? 'vids',
        password: process.env.DB_PASSWORD ?? '',
    },

    // Cache TTL in seconds
    cache: {
        videoTTL: 60 * 60 * 24, // 24 hours
        channelTTL: 60 * 60 * 24 * 7, // 7 days
    },
} as const

export type Config = typeof config
export default config
