import { NavLink } from 'react-router-dom'
import {
    House,
    FolderSimple,
    Fire,
    Clock,
    Star,
    Plus
} from '@phosphor-icons/react'
import './Navbar.css'

interface NavItem {
    to: string
    icon: typeof House
    label: string
    center?: boolean
}

const navItems: NavItem[] = [
    { to: '/', icon: House, label: 'Accueil' },
    { to: '/subscriptions', icon: FolderSimple, label: 'Abonnements' },
    { to: '/trending', icon: Fire, label: 'Tendances' },
    { to: '/later', icon: Clock, label: 'À regarder' },
    { to: '/playlists', icon: Star, label: 'Playlists' },
]

/**
 * Bottom navigation bar with squircle glassmorphism design
 */
export function Navbar() {
    return (
        <nav className="navbar">
            {navItems.slice(0, 3).map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `navbar__item ${isActive ? 'navbar__item--active' : ''}`
                    }
                >
                    <item.icon size={24} weight="regular" />
                    <span className="navbar__tooltip">{item.label}</span>
                </NavLink>
            ))}

            {/* Center button - Add video to Watch Later */}
            <button className="navbar__item navbar__item--center" title="Ajouter">
                <Plus size={28} weight="bold" />
                <span className="navbar__tooltip">Ajouter</span>
            </button>

            {navItems.slice(3).map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `navbar__item ${isActive ? 'navbar__item--active' : ''}`
                    }
                >
                    <item.icon size={24} weight="regular" />
                    <span className="navbar__tooltip">{item.label}</span>
                </NavLink>
            ))}
        </nav>
    )
}

export default Navbar
