import { Fire } from '@phosphor-icons/react'
import './pages.css'

export function Trending() {
    return (
        <div className="page">
            <header className="page__header">
                <h1 className="page__title">Tendances</h1>
                <p className="page__description">Les vidéos populaires du moment</p>
            </header>

            <div className="page__placeholder">
                <Fire size={64} weight="thin" className="page__placeholder-icon" />
                <p className="page__placeholder-text">Vidéos tendances</p>
                <p className="page__placeholder-subtext">
                    Découvrez les vidéos les plus populaires
                </p>
            </div>
        </div>
    )
}

export default Trending
