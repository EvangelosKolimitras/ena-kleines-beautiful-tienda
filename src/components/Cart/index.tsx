import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { CartItem } from '../CartItem'
import { IProduct } from '../Products'
import { useStyles } from './styles'

interface CartProps {
	cart: {
		id: string
		line_items: any[]
		subtotal: {
			raw: string | number
		}
	}
}
export const Cart: React.FC<CartProps> = (props): JSX.Element => {
	const { cart } = props

	const classes = useStyles();

	const CartWithNoItems = () =>
		<Typography variant="subtitle1">No items. Start adding items to see them here.</Typography>

	const CartWithItems = () =>
		<>
			<Grid container spacing={3}>
				{
					cart.line_items ?
						cart.line_items.map((item: IProduct) => {
							return (
								<Grid item xs={12} sm={4} key={cart.id}>
									<CartItem item={item} />
								</Grid>
							)
						}) :
						<Typography variant="h6" color="primary">No items in the basket. <Link className={classes.link} to="/">Add some</Link>!</Typography>
				}
			</Grid>
			<Box component="div" className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal: {cart.subtotal.raw}€
				</Typography>
				<Box component="div">
					<Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" >Empty cart</Button>
					<Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" >Check out</Button>
				</Box>
			</Box>
		</>
	if (!cart.line_items) return <p>Loading...</p>
	return (
		<Container>
			<Box className={classes.toolbar} component="div" />
			<Typography variant="h3" gutterBottom className={classes.title}>Your Shopping Cart</Typography>
			{
				!cart.line_items.length ? <CartWithNoItems /> : <CartWithItems />
			}
		</Container>
	)
}

