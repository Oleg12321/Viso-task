import { ReactNode } from 'react'

// Тип для інгредієнтів, можна використовувати для кожного інгредієнта
export interface Ingredient {
	strIngredient: string
	strMeasure: string
}

// Тип для рецепту
// Тип для рецепту з використанням Record
export interface Recipe {
  idMeal: string
  strMeal: string
  strCategory?: string
  strArea?: string
  strMealThumb: string
  strInstructions?: string
  [key: string]: string | Ingredient[] | undefined // Замінили на Record
}


// Тип для деталей рецепту, де є інгредієнти та інші додаткові властивості
// Тип для деталей рецепту
export interface RecipeDetails extends Recipe {
  ingredients?: Ingredient[] | string | undefined

}


// Тип для контексту вибраних рецептів
export interface SelectedRecipesContextType {
	selectedRecipes: Recipe[]
	addRecipe: (recipe: Recipe) => void
	removeRecipe: (recipeId: string) => void
}

// Тип для пропсів провайдера контексту
export interface SelectedRecipesProviderProps {
	children: ReactNode
}
