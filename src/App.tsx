import React from 'react'
import { Products, NavBar } from './components/'
import { commerce } from './lib'

export const App: React.FC = (): JSX.Element =>
	<>
		<NavBar />
		<Products />
	</>