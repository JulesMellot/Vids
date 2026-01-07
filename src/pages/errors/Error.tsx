import { Bug } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import '../pages.css'
import './errors.css'

interface ErrorPageProps {
    error?: Error
    message?: string
}

export function Error({ error, message }: ErrorPageProps) {
    const displayMessage = message ?? error?.message ?? 'Une erreur inattendue s\'est produite'

    return (
        <div className="page error-page">
            <div className="error-page__content">
                <Bug size={80} weight="thin" className="error-page__icon" />
                <h1 className="error-page__title">Oups !</h1>
                <p className="error-page__message">
                    {displayMessage}
                </p>
                <p className="error-page__submessage">
                    Ce n'est pas vous, c'est nous. On va régler ça ! 🔧
                </p>
                <Link to="/" className="error-page__button">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}

export default Error
