import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React from 'react'

interface IReviewProps {
	checkoutToken: any
}
export const Review: React.FC<IReviewProps> = (props): JSX.Element => {
	return (
		<>
			<Typography variant="h6" gutterBottom>Order Symmary</Typography>
			<List disablePadding>
				{
					props.checkoutToken.live.line_items.map((product: any) => {
						return (
							<ListItem style={{ padding: "10px 0" }} key={product.name}>
								<ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
								<Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
							</ListItem>
						)
					})
				}
				<ListItem style={{ padding: "10px 0" }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" style={{ fontWeight: 700 }}>
						{props.checkoutToken.live.subtotal.formatted_with_symbol}
					</Typography>
				</ListItem>
			</List>
		</>
	)
}