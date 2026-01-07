import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from './components/layout/PageLayout'
import Home from './pages/Home'
import Watch from './pages/Watch'
import Search from './pages/Search'
import Subscriptions from './pages/Subscriptions'
import Playlists from './pages/Playlists'
import Trending from './pages/Trending'
import WatchLater from './pages/WatchLater'
import History from './pages/History'
import Settings from './pages/Settings'
import NotFound from './pages/errors/NotFound'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/watch/:videoId" element={<Watch />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/later" element={<WatchLater />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
