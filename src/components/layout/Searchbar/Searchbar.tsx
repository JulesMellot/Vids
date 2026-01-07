import { Link } from 'react-router-dom'
import { Bell, Gear, Play } from '@phosphor-icons/react'
import SearchInput from '../../search/SearchInput/SearchInput'
import './Searchbar.css'

export function Searchbar() {
    return (
        <header className="searchbar">
            <Link to="/" className="searchbar__logo">
                <Play size={32} weight="fill" className="searchbar__logo-icon" />
                <span>Vids</span>
            </Link>

            <div className="searchbar__input-container">
                <SearchInput />
            </div>

            <div className="searchbar__actions">
                <button
                    className="searchbar__action searchbar__action--notification"
                    title="Notifications"
                >
                    <Bell size={24} weight="regular" />
                    {/* <span className="searchbar__badge">3</span> */}
                </button>

                <Link to="/settings" className="searchbar__action" title="Paramètres">
                    <Gear size={24} weight="regular" />
                </Link>
            </div>
        </header>
    )
}

export default Searchbar
