import React, { useEffect, useState } from 'react'
import { fetchRecipes, searchRecipes } from '../../services/api'
import { Link } from 'react-router-dom'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import Pagination from '../../components/Pagination/Pagination'
import { useDebounce } from '../../hooks/useDebounce'
import { useSelectedRecipes } from '../../context/SelectedRecipesContext'
import { Recipe } from '../../services/types'
import './RecipesPage.css'


const RecipesPage: React.FC = () => {
	const { selectedRecipes, addRecipe } = useSelectedRecipes()
	const [recipes, setRecipes] = useState<Recipe[]>([]) // Типізуємо recipes як масив Recipe
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [text, setText] = useState('')
	const debouncedText = useDebounce(text, 1000)

	useEffect(() => {
		const searchData = async () => {
			if (!debouncedText) return
			setLoading(true)
			try {
				const { meals, totalPages } = await searchRecipes(
					debouncedText,
					currentPage
				)
				setRecipes(meals)
				setTotalPages(totalPages)
			} catch (error: any) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		searchData()
	}, [debouncedText, currentPage])

	useEffect(() => {
		const loadRecipes = async () => {
			if (debouncedText) return
			setLoading(true)
			try {
				const { meals, totalPages } = await fetchRecipes(
					selectedCategory,
					currentPage
				)
				setRecipes(meals)
				setTotalPages(totalPages)
			} catch (error: any) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		loadRecipes()
	}, [selectedCategory, currentPage, debouncedText])

	const handleCategorySelect = (category: string) => {
		setSelectedCategory(category)
		setCurrentPage(1)
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	const handleAddRecipeLocal = (recipe: Recipe) => {
		// Типізуємо параметр recipe як Recipe
		console.log(recipe)

		if (!selectedRecipes.some(r => r.idMeal === recipe.idMeal)) {
			addRecipe(recipe)
		}
	}

	useEffect(() => {
		setCurrentPage(1)
	}, [debouncedText])

	if (loading) return <p>Завантаження...</p>
	if (error) return <p>{error}</p>

	return (
		<div>
			<div>
				<input
					value={text}
					onChange={e => setText(e.target.value)}
					placeholder='Пошук рецепту...'
					autoFocus={true}
				/>
			</div>
			<h1>Рецепти</h1>
			<CategoryFilter onCategorySelect={handleCategorySelect} />
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{recipes && recipes.length > 0 ? (
					recipes.map((recipe: Recipe) => (
						<div key={recipe.idMeal} className='recipe-item'>
							<Link to={`/recipe/${recipe.idMeal}`} className='link-box'>
								<h2>{recipe.strMeal}</h2>
								<img
									src={recipe.strMealThumb}
									alt={recipe.strMeal}
									style={{ width: '150px', height: '150px' }}
								/>
								<p>Категорія: {recipe.strCategory}</p>
								<p>Походження: {recipe.strArea}</p>
							</Link>
							<button
								onClick={() => handleAddRecipeLocal(recipe)}
								className='btn-add-recipe-local'
							>
								Додати
							</button>
						</div>
					))
				) : (
					<p>Нічого не знайдено</p>
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default RecipesPage
