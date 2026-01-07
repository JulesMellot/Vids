import { Warning } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import '../pages.css'
import './errors.css'

export function NotFound() {
    return (
        <div className="page error-page">
            <div className="error-page__content">
                <Warning size={80} weight="thin" className="error-page__icon" />
                <h1 className="error-page__title">404</h1>
                <p className="error-page__message">
                    Cette page n'existe pas. Peut-être qu'elle a été supprimée,
                    ou alors vous vous êtes trompé d'URL ? 🤔
                </p>
                <Link to="/" className="error-page__button">
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}

export default NotFound
