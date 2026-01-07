import { Gear } from '@phosphor-icons/react'
import './pages.css'

export function Settings() {
    return (
        <div className="page">
            <header className="page__header">
                <h1 className="page__title">Paramètres</h1>
                <p className="page__description">Personnalisez votre expérience</p>
            </header>

            <div className="page__placeholder">
                <Gear size={64} weight="thin" className="page__placeholder-icon" />
                <p className="page__placeholder-text">Préférences</p>
                <p className="page__placeholder-subtext">
                    Configurez SponsorBlock, DeArrow et plus encore
                </p>
            </div>
        </div>
    )
}

export default Settings
