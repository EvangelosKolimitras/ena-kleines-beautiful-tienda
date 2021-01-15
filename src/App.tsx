import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { Products, NavBar, Cart, Checkout } from './components/'
import { IProduct } from './components/Products';
import { commerceInstance } from './lib'

export const App: React.FC = (): JSX.Element => {

	const [products, setProducts] = useState<any[]>([]);
	const [order, setOrder] = useState({})
	const [errorMsg, setErrorMsg] = useState("")
	const [cart, setCart] = useState<any>({})

	const addItemInBasketHandler = async (pID: string, quantity: number) => {
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
		setCart(items)
	}

	const refreshCart = async () => {
		const newCard = await commerceInstance.cart.refresh();
		setCart(newCard)
	}

	const captureCheckoutHandler = async (checkoutTokenId: string, newOrder: any) => {
		try {
			const incomingOrder = await commerceInstance.checkout.capture(checkoutTokenId, newOrder)
			setOrder(incomingOrder)
			refreshCart()
		} catch (error) {
			setErrorMsg(error.data.error.message)
		}
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
					<Products prods={products} onAddItem={addItemInBasketHandler} />
				</Route>
				<Route exact path="/cart">
					<Cart
						cart={cart !== undefined && cart}
						updateCartQuantityHandler={updateCartQuantityHandler}
						removeItemFromCartHandler={removeItemFromCartHandler}
						emptyCartHandler={emptyCartHandler}
					/>
				</Route>
				<Route exact path="/checkout">
					<Checkout
						cart={cart}
						order={order}
						error={errorMsg}
						captureCheckoutHandler={captureCheckoutHandler}
					/>
				</Route>
			</Switch>
		</>
	)
}
