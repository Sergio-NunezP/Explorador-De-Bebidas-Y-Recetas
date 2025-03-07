import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'
import { RecipesSliceType } from './recipeSlice'

export type FavoritesSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
    loadFromStorge: () => void

}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExist(recipe.idDrink)) {
            //Eliminar una receta
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            // Mostrar notificacion 
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false
            })
        } else {
            //Agregar receta
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            // Mostrar notificacion 
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos',
                error: false
            })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    //Almacenar en el localStorgae
    loadFromStorge: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})