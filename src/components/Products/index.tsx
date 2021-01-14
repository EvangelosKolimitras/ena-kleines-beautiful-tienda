import { Box, Grid } from '@material-ui/core'
import React from 'react'
import Product from '../Product'
import { useStyles } from './styles'

export interface IProduct {
	id: number
	name: string
	description: string
	image: string
	price: string
}

type TProducts = Array<IProduct>

const products: TProducts = [
	{ id: 1, name: "Shoes", description: "Casual shoes", price: "92", image: "https://cdn.luxe.digital/media/2020/02/17134439/cole-haan-grandpo-tennis-men-best-value-sneakers-luxe-digital.jpg" },
	{ id: 2, name: "Pc", description: "An iMac", price: "599", image: "https://images-na.ssl-images-amazon.com/images/I/71pheYd9W0L._AC_SL1500_.jpg" },
]

const renderProducts = (products: TProducts): JSX.Element[] =>
	products.map(
		(product: IProduct) =>
			<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
				<Product product={product} />
			</Grid>
	)

interface ProductsProps {
	prods: IProduct[]
}

export const Products: React.FC<ProductsProps> = (props): JSX.Element => {
	const classes = useStyles();
	console.log(props.prods);

	return (
		<main className={classes.content}>
			<Box component="div" className={classes.toolbar} />
			<Grid container justify="center" spacing={4}>
				{renderProducts([...products, ...props.prods])}
			</Grid>
		</main>
	)
}