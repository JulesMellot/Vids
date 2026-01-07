import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { Searchbar } from '../Searchbar'
import './PageLayout.css'

/**
 * Main page layout with searchbar and navbar
 */
export function PageLayout() {
    return (
        <div className="page-layout">
            <Searchbar />
            <main className="page-layout__content">
                <Outlet />
            </main>
            <Navbar />
        </div>
    )
}

export default PageLayout
