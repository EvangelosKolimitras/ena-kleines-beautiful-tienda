import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Products, NavBar, Cart } from './components/'
import { IProduct } from './components/Products';
import { commerceInstance } from './lib'

export const App: React.FC = (): JSX.Element => {

	const initialValue: any = []
	const [products, setProducts] = useState(initialValue);

	interface initialValue {
		total_items: number
	}

	const [cart, setCart] = useState(initialValue)

	const addItemInBasketHandkler = async (pID: string, quantity: number) => {
		const { cart } = await commerceInstance.cart.add(pID, quantity)
		setCart(cart)
	}

	const updateCartQuantityHandler = async (pID: string, quantity: number) => {
		const { cart } = await commerceInstance.cart.update(pID, { quantity })
		setCart(cart)
	}

	const removeItemFromCartHandler = async (pID: string) => {
		const { cart } = await commerceInstance.cart.remove(pID)
		setCart(cart)
	}

	const emptyCartHandler = async () => {
		const { cart } = await commerceInstance.cart.empty();
		setCart(cart)
	}

	const fetchCart = async () => {
		const items = await commerceInstance.cart.retrieve()
		console.log(items);
		setCart(items)
	}

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
		fetchCart()
	}, [])

	return (
		<>
			<NavBar totatItemsInBasket={cart !== undefined && cart.total_items} />
			<Switch>
				<Route exact path="/" >
					<Products prods={products} onAddItem={addItemInBasketHandkler} />
				</Route>
				<Route exact path="/cart">
					<Cart
						cart={cart !== undefined && cart}
						updateCartQuantityHandler={updateCartQuantityHandler}
						removeItemFromCartHandler={removeItemFromCartHandler}
						emptyCartHandler={emptyCartHandler}
					/>
				</Route>
			</Switch>
		</>
	)
}
