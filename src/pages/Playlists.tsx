import { Queue } from '@phosphor-icons/react'
import './pages.css'

export function Playlists() {
    return (
        <div className="page">
            <header className="page__header">
                <h1 className="page__title">Playlists</h1>
                <p className="page__description">Vos playlists personnalisées</p>
            </header>

            <div className="page__placeholder">
                <Queue size={64} weight="thin" className="page__placeholder-icon" />
                <p className="page__placeholder-text">Vos playlists</p>
                <p className="page__placeholder-subtext">
                    Créez des playlists pour organiser vos vidéos
                </p>
            </div>
        </div>
    )
}

export default Playlists
