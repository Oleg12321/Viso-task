import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchRecipeDetails } from '../../services/api'
import { RecipeDetails } from '../../services/types'

const RecipeDetailsPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [recipe, setRecipe] = useState<RecipeDetails | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadRecipeDetails = async () => {
			try {
				const data = await fetchRecipeDetails(id!)
				setRecipe(data)
			} catch (error: any) {
				setError(error.message || 'Something went wrong.')
			} finally {
				setLoading(false)
			}
		}

		loadRecipeDetails()
	}, [id])

	if (loading) return <p>Завантаження...</p>
	if (error) return <p>{error}</p>
	if (!recipe) return <p>Рецепт не знайдено.</p>

	// Перевіряємо, чи є ingredients масивом перед використанням map
	const ingredients = Array.isArray(recipe.ingredients)
		? recipe.ingredients
		: []

	return (
		<div>
			<h1>{recipe.strMeal}</h1>
			<img
				src={recipe.strMealThumb}
				alt={recipe.strMeal}
				style={{ width: '300px', height: '300px' }}
			/>
			<p>Категорія: {recipe.strCategory}</p>
			<p>Походження: {recipe.strArea}</p>
			<h2>Інгредієнти:</h2>
			<ul>
				{ingredients.map((ingredient, index) => (
					<li key={index}>
						{`${ingredient.strIngredient} - ${ingredient.strMeasure}`}
					</li>
				))}
			</ul>
			<h2>Інструкції:</h2>
			<p>{recipe.strInstructions}</p>
		</div>
	)
}

export default RecipeDetailsPage
