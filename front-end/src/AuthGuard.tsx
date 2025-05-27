import React, { StrictMode } from 'react'
import { Outlet } from 'react-router-dom'
import NavbarLocal from './components/shared/navbar/navbar'

interface AuthGuardProps {
	// You can define any props here if needed
}

const AuthGuard: React.FC<AuthGuardProps> = () => {
	return (
		<StrictMode>
			<div className="main-wrapper">
				<NavbarLocal />
				<main className="main-container container-fluid padding-2rem">
					<Outlet />
				</main>
			</div>
		</StrictMode>
	)
}

export { AuthGuard }
