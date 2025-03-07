import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipesById } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

// State
export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

// Funciones de nuestra app
export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
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
        const selectedRecipe = await getRecipesById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    // Cerrar modal
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})