import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoCard.css';

interface VideoCardProps {
    video: {
        id: string;
        title: string;
        thumbnail: string;
        previewUrl?: string;
        author: string;
        authorAvatar?: string;
        views: string;
        publishedTime: string;
        duration: string;
    };
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    let hoverTimeout: any;

    const handleMouseEnter = () => {
        setIsHovered(true);
        hoverTimeout = setTimeout(() => {
            setShowPreview(true);
        }, 500); // 500ms delay before preview
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setShowPreview(false);
        clearTimeout(hoverTimeout);
    };

    const handleClick = () => {
        navigate(`/watch/${video.id}`);
    };

    return (
        <div
            className={`vids-video-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div className="vids-video-card__thumbnail-container">
                {showPreview && video.previewUrl ? (
                    <video
                        className="vids-video-card__preview"
                        src={video.previewUrl}
                        autoPlay
                        muted
                        loop
                    />
                ) : (
                    <img
                        className="vids-video-card__thumbnail"
                        src={video.thumbnail}
                        alt={video.title}
                    />
                )}
                <span className="vids-video-card__duration">{video.duration}</span>
            </div>

            <div className="vids-video-card__info">
                <div className="vids-video-card__author-avatar">
                    {video.authorAvatar ? (
                        <img src={video.authorAvatar} alt={video.author} />
                    ) : (
                        <div className="vids-video-card__author-placeholder" />
                    )}
                </div>
                <div className="vids-video-card__details">
                    <h3 className="vids-video-card__title" title={video.title}>
                        {video.title}
                    </h3>
                    <p className="vids-video-card__author-name">{video.author}</p>
                    <p className="vids-video-card__meta">
                        {video.views} • {video.publishedTime}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
