import { ClockCounterClockwise } from '@phosphor-icons/react'
import './pages.css'

export function History() {
    return (
        <div className="page">
            <header className="page__header">
                <h1 className="page__title">Historique</h1>
                <p className="page__description">Vos vidéos récemment regardées</p>
            </header>

            <div className="page__placeholder">
                <ClockCounterClockwise size={64} weight="thin" className="page__placeholder-icon" />
                <p className="page__placeholder-text">Historique de visionnage</p>
                <p className="page__placeholder-subtext">
                    Vos vidéos regardées apparaîtront ici
                </p>
            </div>
        </div>
    )
}

export default History
