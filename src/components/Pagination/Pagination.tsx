import React from 'react'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePageClick = (data: { selected: number }) => {
		const selectedPage = data.selected + 1 // Додаємо +1, щоб правильно відображати сторінки з 1
		onPageChange(selectedPage)
	}

	return (
		<div>
			<ReactPaginate
				previousLabel='< previous'
				nextLabel='next >'
				breakLabel='...' // Додаємо крапочки
				pageCount={totalPages}
				marginPagesDisplayed={1} // Відображення крапок, якщо більше 2 сторінок на початку та кінці
				pageRangeDisplayed={2} // Відображення 5 сторінок
				onPageChange={handlePageClick}
				containerClassName='pagination' // Клас для контейнера пагінації
				activeClassName='active' // Клас для активної сторінки
				disabledClassName='disabled' // Клас для деактивованої кнопки
				breakClassName='break' // Клас для крапок
				forcePage={currentPage - 1} // Задаємо поточну сторінку, враховуючи, що пагінація з 0
			/>
		</div>
	)
}

export default Pagination
