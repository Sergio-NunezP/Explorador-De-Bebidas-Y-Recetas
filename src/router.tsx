import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './views/IndexPage'
import FavoritesPages from './views/FavoritesPages'


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IndexPage />} />
                <Route path='/favoritos' element={<FavoritesPages />} />
            </Routes>
        </BrowserRouter>
    )
}
