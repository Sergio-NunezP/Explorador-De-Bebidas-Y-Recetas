import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipesById } from "../services/RecipeService"
import type { Categories, Drink, Drinks, SearchFilter } from "../types"

// State
export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
}

// Funciones de nuestra app
export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },

    // Categorias
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },

    // Recetas
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    // traer la receta seleccionada
    selectRecipe: async (id) => {
        const selectRecipe = await getRecipesById(id)
        console.log(selectRecipe)
    }
})