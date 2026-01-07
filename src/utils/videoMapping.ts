export const mapYoutubeToVideoCard = (ytVideo: any) => {
    // Extract duration from thumbnail_overlays
    const durationOverlay = ytVideo.thumbnail_overlays?.find(
        (o: any) => o.type === 'ThumbnailOverlayTimeStatus'
    );

    return {
        id: ytVideo.video_id || ytVideo.id,
        title: ytVideo.title?.text || ytVideo.title || 'Sans titre',
        thumbnail: ytVideo.thumbnails?.[0]?.url || '',
        previewUrl: ytVideo.rich_thumbnail?.url || null,
        author: ytVideo.author?.name || ytVideo.owner?.author?.name || 'Unknown',
        authorAvatar: ytVideo.author?.thumbnails?.[0]?.url || '',
        views: ytVideo.view_count?.text || ytVideo.short_view_count_text?.text || '0 vues',
        publishedTime: ytVideo.published?.text || '',
        duration: durationOverlay?.text || ytVideo.duration?.text || '00:00',
    };
};
