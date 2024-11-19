// CategoryFilter.tsx
import React, { useEffect, useState } from 'react'
import { fetchCategories } from '../../services/api'
import { Category } from '../../services/types'


interface CategoryFilterProps {
	onCategorySelect: (category: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
	onCategorySelect,
}) => {
	const [categories, setCategories] = useState<Category[]>([]) 

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await fetchCategories()
				setCategories(data)
			} catch (error) {
				console.error(error)
			}
		}
		loadCategories()
	}, [])

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedCategory = event.target.value
		onCategorySelect(selectedCategory) // Викликаємо функцію для фільтрації
	}

	return (
		<div>
			<select onChange={handleCategoryChange}>
				<option value=''>Виберіть категорію</option>
				{categories.map(category => (
					<option key={category.strCategory} value={category.strCategory}>
						{category.strCategory}
					</option>
				))}
			</select>
		</div>
	)
}

export default CategoryFilter
