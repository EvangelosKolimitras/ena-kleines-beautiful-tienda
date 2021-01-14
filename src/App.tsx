import React, { useEffect, useState } from 'react'
import { Products, NavBar } from './components/'
import { IProduct } from './components/Products';
import { commerceInstance } from './lib'

export const App: React.FC = (): JSX.Element => {

	const initialValue: any = []
	const [products, setProducts] = useState(initialValue);

	const fetchProducts = async () => {
		const { data } = await commerceInstance.products.list();
		let cache: IProduct[] = []

		// Reshape the data to match our schema
		for (let i of data) {
			cache.push(...products, {
				id: i.id,
				name: i.name,
				description: i.description,
				price: i.price.raw,
				image: i.media.source,
			})
		}
		setProducts(cache)
	}

	useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<>
			<NavBar />
			<Products prods={products} />
		</>
	)
}
