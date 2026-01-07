import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchVideos } from '../services/api/videos'
import { mapYoutubeToVideoCard } from '../utils/videoMapping'
import VideoGrid from '../components/video/VideoGrid/VideoGrid'
import './pages.css'

export function Search() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [videos, setVideos] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query) return

        setLoading(true)
        searchVideos(query)
            .then(data => {
                const allResults = data.videos || data.results || []
                // Filter only Video types (exclude LockupView, Shelf, etc.)
                const videoResults = allResults.filter((item: any) =>
                    item.type === 'Video' && item.video_id
                )
                const results = videoResults.map(mapYoutubeToVideoCard)
                setVideos(results)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [query])

    return (
        <div className="page">
            <header className="page__header search-header">
                <h1 className="page__title">Résultats pour "{query}"</h1>
            </header>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner" />
                </div>
            ) : videos.length > 0 ? (
                <VideoGrid videos={videos} />
            ) : (
                <div className="page__placeholder">
                    <p className="page__placeholder-text">Aucun résultat trouvé</p>
                    <p className="page__placeholder-subtext">
                        Essayez d'autres mots-clés ou vérifiez l'orthographe.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Search
