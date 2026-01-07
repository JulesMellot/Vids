import NodeCache from 'node-cache';

class CacheService {
    private cache: NodeCache;

    constructor(ttlSeconds: number = 3600) {
        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
            useClones: false,
        });
    }

    get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    set<T>(key: string, value: T, ttl?: number): boolean {
        if (ttl) {
            return this.cache.set(key, value, ttl);
        }
        return this.cache.set(key, value);
    }

    del(key: string): number {
        return this.cache.del(key);
    }

    flush(): void {
        this.cache.flushAll();
    }
}

export const youtubeCache = new CacheService(3600); // 1 hour default cache
export default youtubeCache;
