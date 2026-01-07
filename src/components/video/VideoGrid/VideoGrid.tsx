import React from 'react';
import VideoCard from '../VideoCard/VideoCard';
import './VideoGrid.css';

interface VideoGridProps {
    videos: any[];
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
    return (
        <div className="vids-video-grid">
            {videos.map((video, index) => (
                <VideoCard key={`${video.id}-${index}`} video={video} />
            ))}
        </div>
    );
};

export default VideoGrid;
