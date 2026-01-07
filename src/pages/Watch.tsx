import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { VideoPlayer } from '../components/video/VideoPlayer/VideoPlayer'
import { fetchVideoDetails } from '../services/api/videos'
import './pages.css'

export function Watch() {
    const { videoId } = useParams<{ videoId: string }>()
    const [videoData, setVideoData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const playerRef = useRef<any>(null)

    useEffect(() => {
        if (!videoId) return

        setLoading(true)
        fetchVideoDetails(videoId)
            .then(data => {
                setVideoData(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [videoId])

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: videoData?.streaming_data?.adaptive_formats?.filter((f: any) => f.has_video && f.has_audio).map((f: any) => ({
            src: f.url,
            type: f.mime_type
        })) || []
    }

    // Fallback source if adaptive formats filtering is tricky
    if (videoJsOptions.sources.length === 0 && videoData?.streaming_data?.hls_manifest_url) {
        videoJsOptions.sources.push({
            src: videoData.streaming_data.hls_manifest_url,
            type: 'application/x-mpegURL'
        })
    }

    const handlePlayerReady = (player: any) => {
        playerRef.current = player;
    }

    if (loading) {
        return <div className="page">Chargement...</div>
    }

    return (
        <div className="page watch-page">
            <div className="watch-container">
                <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />

                {videoData && (
                    <div className="video-info">
                        <h1 className="video-title">{videoData.basic_info.title}</h1>
                        <div className="video-meta">
                            <span className="channel-name">{videoData.basic_info.author}</span>
                            <span className="view-count">{videoData.basic_info.view_count} vues</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Watch
