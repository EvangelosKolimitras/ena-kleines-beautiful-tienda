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

const renderProducts = (products: TProducts, onAddItem: Function): JSX.Element[] =>
	products.map(
		(product: IProduct) =>
			<Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
				<Product product={product} onAddItem={onAddItem} />
			</Grid>
	)

interface ProductsProps {
	prods: IProduct[]
	onAddItem: Function
}

export const Products: React.FC<ProductsProps> = (props): JSX.Element => {
	const classes = useStyles();
	const { onAddItem, prods } = props
	return (
		<main className={classes.content}>
			<Box component="div" className={classes.toolbar} />
			<Grid container justify="center" spacing={4}>
				{renderProducts(prods, onAddItem)}
			</Grid>
		</main>
	)
}