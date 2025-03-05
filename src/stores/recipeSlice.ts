import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import type { Categories, Drinks, SearchFilter } from "../types"

// State
export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>

}

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
    }
})