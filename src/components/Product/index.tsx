import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React from 'react'
import { useStyles } from './styles'
import { IProduct } from '../Products'

interface ProductProps { product: IProduct }
const Product: React.FC<ProductProps> = (props) => {
	const { product: { name, description, price, image } } = props
	const classes = useStyles()

	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={image} title={name} />
			<CardContent>
				<Box component="div" className={classes.cardContent}>
					<Typography variant="h5" gutterBottom>
						{name}
					</Typography>
					<Typography variant="h5">
						{price}€
					</Typography>
				</Box>
				<Typography dangerouslySetInnerHTML={{ __html: description }} variant="body2" color="textSecondary" />
				<CardActions disableSpacing className={classes.cardActions}>
					<IconButton aria-label="Add to Cart">
						<AddShoppingCart />
					</IconButton>
				</CardActions>
			</CardContent>
		</Card>
	)
}

export default Product
