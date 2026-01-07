/**
 * Database Configuration
 * PostgreSQL connection setup
 */

import pg from 'pg'
import { config } from './index.js'

const { Pool } = pg

export const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
    try {
        const client = await pool.connect()
        await client.query('SELECT NOW()')
        client.release()
        console.log('✅ Database connection successful')
        return true
    } catch (error) {
        console.error('❌ Database connection failed:', error)
        return false
    }
}

/**
 * Execute a query with parameters
 */
export async function query<T = unknown>(
    text: string,
    params?: unknown[]
): Promise<pg.QueryResult<T>> {
    return pool.query<T>(text, params)
}

export default pool
