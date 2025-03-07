import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
const IndexPage = lazy(() => import('./views/FavoritesPages'))
const FavoritesPages = lazy(() => import('./views/FavoritesPages'))


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                < Route element={<Layout />}>
                    <Route path='/' element={
                        <Suspense fallback='Cargando...'>
                            <IndexPage />
                        </Suspense>
                    } index />
                    <Route path='/favoritos' element={
                        <Suspense fallback='Cargando...'>
                            <FavoritesPages />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
