import React, { useState, useEffect, useCallback } from 'react';
import VideoGrid from '../../video/VideoGrid/VideoGrid';
import { searchVideos } from '../../../services/api/videos';
import { mapYoutubeToVideoCard } from '../../../utils/videoMapping';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import './HomeFeed.css';

export const HomeFeed: React.FC = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [continuationToken, setContinuationToken] = useState<string | null>(null);

    const fetchMoreVideos = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            // Fallback to searching for "trending" since the /trending endpoint had issues
            // In a real scenario, youtubei.js search results also include a continuation token
            const results = await searchVideos('trending music'); // Example query

            const allResults = results.videos || results.results || [];
            // Filter only Video types (exclude LockupView, Shelf, etc.)
            const videoResults = allResults.filter((item: any) =>
                item.type === 'Video' && item.video_id
            );
            const newVideos = videoResults.map(mapYoutubeToVideoCard);

            // Deduplicate: only add videos that aren't already in the list
            setVideos(prev => {
                const existingIds = new Set(prev.map(v => v.id));
                const uniqueNewVideos = newVideos.filter((v: any) => !existingIds.has(v.id));
                return [...prev, ...uniqueNewVideos];
            });

            // If we got no unique new videos, stop fetching
            if (newVideos.length === 0) setHasMore(false);

        } catch (error) {
            console.error('Error fetching home feed:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        fetchMoreVideos();
    }, []);

    const { ref } = useInfiniteScroll({
        onLoadMore: fetchMoreVideos,
        hasMore,
        isLoading: loading,
    });

    return (
        <div className="vids-home-feed">
            <VideoGrid videos={videos} />
            {hasMore && (
                <div ref={ref} className="vids-home-feed__loader">
                    {loading && <div className="spinner" />}
                </div>
            )}
        </div>
    );
};

export default HomeFeed;
