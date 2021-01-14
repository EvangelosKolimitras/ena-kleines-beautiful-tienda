import React, { useEffect, useState } from 'react'
import { Products, NavBar } from './components/'
import { IProduct } from './components/Products';
import { commerceInstance } from './lib'

export const App: React.FC = (): JSX.Element => {

	const initialValue: any = []
	const [products, setProducts] = useState(initialValue);
	const [cart, setCart] = useState({})

	const addItemInBasketHandkler = async (pID: string, quantity: number) => {
		const item = await commerceInstance.cart.add(pID, quantity)
		setCart(item.cart)
	}

	const fetchCart = async () =>
		setCart(await commerceInstance.cart.retrieve())

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

	useEffect(() => {
		fetchCart()
	}, [])
	console.log(cart);

	return (
		<>
			<NavBar />
			<Products prods={products} onAddItem={addItemInBasketHandkler} />
		</>
	)
}
