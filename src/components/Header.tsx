import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const [searchFilters, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // TODO: Valiar
        if (Object.values(searchFilters).includes('')) {
            console.log('Todos los campos son obligatorios')
            return
        }

        // Consultar las recetas
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center  bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-300 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Inicio</NavLink>
                        <NavLink
                            to='/favoritos'
                            className={({ isActive }) =>
                                isActive ? 'text-orange-300 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingrediente</label>

                            <input
                                type="text"
                                name="ingredient"
                                id="ingredient"
                                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingrediente: Ej. Vodka, Café"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoria</label>

                            <select
                                name="category"
                                id="category"
                                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory} </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Buscar Recetas"
                            className="bg-orange-800 hover:bg-orange-900  cursor-pointer font-extrabold text-white w-full p-2 rounded-2xl uppercase"
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
