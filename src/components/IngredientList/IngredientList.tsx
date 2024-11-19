import React from 'react'
import { Recipe } from '../../services/types'

interface IngredientListProps {
	selectedRecipes: Recipe[]
}

const IngredientList: React.FC<IngredientListProps> = ({ selectedRecipes }) => {
	// Функція для підрахунку інгредієнтів
	const calculateIngredients = () => {
		const ingredients: Record<string, number> = {}

		selectedRecipes.forEach(recipe => {
			for (let i = 1; i <= 20; i++) {
				const ingredient = recipe[`strIngredient${i}`]
				if (ingredient && ingredient.trim()) {
					// Якщо інгредієнт вже є в списку, збільшуємо його кількість
					ingredients[ingredient] = ingredients[ingredient]
						? ingredients[ingredient] + 1
						: 1
				}
			}
		})

		return ingredients
	}

	const ingredientsList = calculateIngredients()

	return (
		<div>
			<ul>
				{Object.entries(ingredientsList).map(([ingredient, count]) => (
					<li key={ingredient}>
						{ingredient}: {count}
					</li>
				))}
			</ul>
		</div>
	)
}

export default IngredientList
