import { Clock } from '@phosphor-icons/react'
import './pages.css'

export function WatchLater() {
    return (
        <div className="page">
            <header className="page__header">
                <h1 className="page__title">À regarder plus tard</h1>
                <p className="page__description">Vidéos sauvegardées pour plus tard</p>
            </header>

            <div className="page__placeholder">
                <Clock size={64} weight="thin" className="page__placeholder-icon" />
                <p className="page__placeholder-text">À regarder</p>
                <p className="page__placeholder-subtext">
                    Ajoutez des vidéos à regarder plus tard
                </p>
            </div>
        </div>
    )
}

export default WatchLater
