// services/api.ts
import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export const fetchRecipes = async (category: string = '', page: number = 1) => {
	const LIMIT = 4 // Кількість елементів на сторінці
	const offset = (page - 1) * LIMIT


	const url = category
		? `${BASE_URL}/filter.php?c=${category}`
		: `${BASE_URL}/search.php?s=`

	const response = await axios.get(url)

	// Вирізаємо потрібну кількість елементів з отриманих даних
	const meals = response.data.meals || []
	const paginatedMeals = meals.slice(offset, offset + LIMIT)

	return {
		meals: paginatedMeals,
		totalPages: Math.ceil(meals.length / LIMIT),
	}
}




export const fetchRecipeDetails = async (id: string) => {
	const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
	return response.data.meals[0]
}

export const fetchCategories = async () => {
	const response = await axios.get(`${BASE_URL}/categories.php`)
	return response.data.categories
}

export const searchRecipes = async (
	search: string,
	page: number = 1,
	limit: number = 4
) => {
	const response = await axios.get(`${BASE_URL}/search.php?s=${search}`)

	const meals = response.data.meals || []
	const offset = (page - 1) * limit
	const paginatedMeals = meals.slice(offset, offset + limit)

	return {
		meals: paginatedMeals,
		totalPages: Math.ceil(meals.length / limit),
	}
}
