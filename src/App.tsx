
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RecipesPage from './pages/RecipesPage/RecipesPage'
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage'
import Layout from './components/Layout/Layout'
import SelectedRecipesPage from './pages/SelectedRecipesPage/SelectedRecipesPage'
import { SelectedRecipesProvider } from './context/SelectedRecipesContext'

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{ path: '', element: <RecipesPage /> },
				{ path: 'recipe/:id', element: <RecipeDetailsPage /> },
				{ path: 'selected', element: <SelectedRecipesPage /> },
			],
		},
	])

	return (
		<SelectedRecipesProvider>
			<RouterProvider router={router} />
		</SelectedRecipesProvider>
	)
}


export default App
