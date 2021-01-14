import { Grid } from '@material-ui/core'
import React from 'react'

export interface IProduct {
	id: number
	name: string
	description: string
}

type TProducts = Array<IProduct>

const products: TProducts = [
	{ id: 1, name: "Shoes", description: "Casual shoes" },
	{ id: 2, name: "Pc", description: "An iMac" },
]

const renderProducts = (products: TProducts): JSX.Element[] =>
	products.map(
		(product: IProduct) =>
			<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
				<h1>{product.name}</h1>
				<p>{product.description}</p>
			</Grid>
	)

const Products = () =>
	<main>
		<Grid container justify="center" spacing={4}>
			{renderProducts(products)}
		</Grid>
	</main>

export default Products
