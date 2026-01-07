/**
 * Vids Server - Entry Point
 * Express server with TypeScript
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config/index.js'
import routes from './routes/index.js'

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
}))

// Body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api', routes)

// Root endpoint
app.get('/', (_req, res) => {
    res.json({
        message: 'Vids API Server',
        docs: '/api',
    })
})

// Start server
app.listen(config.port, () => {
    console.log(`
🎬 Vids Server running!
   
   Local:   http://localhost:${config.port}
   Health:  http://localhost:${config.port}/api/health
   Mode:    ${config.nodeEnv}
`)
})

export default app
