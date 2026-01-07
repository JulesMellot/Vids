/**
 * API Routes
 * Main router configuration
 */

import { Router, type Request, type Response } from 'express'
import youtubeRoutes from './youtubeRoutes'

const router = Router()

/**
 * Health check endpoint
 * GET /api/health
 */
router.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    })
})

/**
 * YouTube routes
 * /api/youtube
 */
router.use('/youtube', youtubeRoutes)

/**
 * API info endpoint
 * GET /api
 */
router.get('/', (_req: Request, res: Response) => {
    res.json({
        name: 'Vids API',
        version: '0.0.1',
        endpoints: {
            health: '/api/health',
            youtube: '/api/youtube',
            // Future endpoints
            // subscriptions: '/api/subscriptions',
            // playlists: '/api/playlists',
        },
    })
})

export default router
