import React from 'react'
import { useSelectedRecipes } from '../../context/SelectedRecipesContext'
import IngredientList from '../../components/IngredientList/IngredientList'

const SelectedRecipesPage: React.FC = () => {
	const { selectedRecipes, removeRecipe } = useSelectedRecipes()
	console.log('Обрані рецепти на сторінці:', selectedRecipes)

	return (
		<div>
			<h2>Обрані рецепти</h2>
			{selectedRecipes.length > 0 ? (
				<ul>
					{selectedRecipes.map(recipe => (
						<li key={recipe.idMeal}>
							<h3>{recipe.strMeal}</h3>
							<p>Категорія: {recipe.strCategory}</p>
							<p>Походження: {recipe.strArea}</p>
							<button onClick={() => removeRecipe(recipe.idMeal)}>
								Видалити
							</button>
						</li>
					))}
				</ul>
			) : (
				<p>Немає обраних рецептів</p>
			)}

			{/* Показуємо інгредієнти */}
			{selectedRecipes.length > 0 && (
				<div>
					<h3>Необхідні інгредієнти для обраних рецептів</h3>
					<IngredientList selectedRecipes={selectedRecipes} />
				</div>
			)}
		</div>
	)
}

export default SelectedRecipesPage
