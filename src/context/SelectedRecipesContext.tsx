import React, { createContext, useContext, useState, useEffect } from 'react'
import { Recipe, SelectedRecipesContextType } from '../services/types'

// Create context for selected recipes
const SelectedRecipesContext = createContext<
	SelectedRecipesContextType | undefined
>(undefined)

export const useSelectedRecipes = () => {
	const context = useContext(SelectedRecipesContext)
	if (!context) {
		throw new Error(
			'useSelectedRecipes must be used within a SelectedRecipesProvider'
		)
	}
	return context
}

export const SelectedRecipesProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([])

	useEffect(() => {
		const storedRecipes = localStorage.getItem('selectedRecipes')
		if (storedRecipes) {
			console.log('Завантажені рецепти з localStorage:', storedRecipes)
			setSelectedRecipes(JSON.parse(storedRecipes))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes))
		console.log('Збережено в localStorage:', selectedRecipes)
	}, [selectedRecipes])

	const addRecipe = (recipe: Recipe) => {
		setSelectedRecipes(prev => {
			if (!prev.some(r => r.idMeal === recipe.idMeal)) {
				console.log('Додаємо рецепт:', recipe)
				return [...prev, recipe]
			}
			console.log('Рецепт вже існує:', recipe)
			return prev
		})
	}

	const removeRecipe = (recipeId: string) => {
		setSelectedRecipes(prev => {
			console.log('Видаляємо рецепт з id:', recipeId)
			return prev.filter(recipe => recipe.idMeal !== recipeId)
		})
	}

	return (
		<SelectedRecipesContext.Provider
			value={{ selectedRecipes, addRecipe, removeRecipe }}
		>
			{children}
		</SelectedRecipesContext.Provider>
	)
}
