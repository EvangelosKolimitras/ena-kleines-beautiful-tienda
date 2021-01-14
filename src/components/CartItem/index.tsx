import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'

interface IItemProps {
	item: any
	updateCartQuantityHandler: any
	removeItemFromCartHandler: any
}

export const CartItem: React.FC<IItemProps> = (props): JSX.Element => {
	const { item, updateCartQuantityHandler, removeItemFromCartHandler } = props
	const classes = useStyles()
	console.log(item);

	return (
		<Card>
			<CardMedia image={item.media.source} className={classes.media} />
			<CardContent className={classes.cardContent}>
				<Typography variant="body1">{item.name}</Typography>
				<Typography variant="body1">{item.line_total.raw}€</Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<Box component="div" className={classes.buttons}>
					<Button type="button" size="small" onClick={() => updateCartQuantityHandler(item.id, item.quantity - 1)}>-</Button>
					<Typography>{item.quantity}</Typography>
					<Button type="button" size="small" onClick={() => updateCartQuantityHandler(item.id, item.quantity + 1)}>+</Button>
				</Box>
				<Button variant='contained' type="button" color="secondary" onClick={() => removeItemFromCartHandler(item.id)}>Remove</Button>
			</CardActions>
		</Card>
	)
} 
