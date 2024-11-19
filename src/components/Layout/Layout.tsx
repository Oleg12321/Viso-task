import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
	return (
		<div>
			<header>
				<nav>
					<ul>
						<li>
							<Link to='/'>Головна</Link>
						</li>
						<li>
							<Link to='/selected'>Обрані рецепти</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>Футер © 2024</footer>
		</div>
	)
}

export default Layout
