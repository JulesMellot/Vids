import { Innertube, UniversalCache } from 'youtubei.js';
import youtubeCache from './cacheService';

class YoutubeService {
    private yt: Innertube | null = null;

    private async getInstance() {
        if (!this.yt) {
            this.yt = await Innertube.create({
                cache: new UniversalCache(false),
                generate_session_locally: true,
            });
        }
        return this.yt;
    }

    async getVideoDetails(videoId: string) {
        const cacheKey = `video_${videoId}`;
        const cached = youtubeCache.get(cacheKey);
        if (cached) return cached;

        const yt = await this.getInstance();
        const basicInfo = await yt.getBasicInfo(videoId);

        // We can also get more details if needed via yt.getInfo(videoId)
        // but getBasicInfo is faster for initial display

        youtubeCache.set(cacheKey, basicInfo);
        return basicInfo;
    }

    async getTrending() {
        const cacheKey = 'trending';
        const cached = youtubeCache.get(cacheKey);
        if (cached) return cached;

        const yt = await this.getInstance();
        const trending = await yt.getTrending();

        youtubeCache.set(cacheKey, trending, 1800); // Cache trending for 30 mins
        return trending;
    }

    async search(query: string, options: { type?: 'video' | 'channel' | 'playlist' } = {}) {
        const cacheKey = `search_${query}_${options.type || 'all'}`;
        const cached = youtubeCache.get(cacheKey);
        if (cached) return cached;

        const yt = await this.getInstance();
        const results = await yt.search(query, options);

        youtubeCache.set(cacheKey, results, 600); // Cache search for 10 mins
        return results;
    }

    async getChannel(channelId: string) {
        const cacheKey = `channel_${channelId}`;
        const cached = youtubeCache.get(cacheKey);
        if (cached) return cached;

        const yt = await this.getInstance();
        const channel = await yt.getChannel(channelId);

        youtubeCache.set(cacheKey, channel);
        return channel;
    }
}

export default new YoutubeService();
