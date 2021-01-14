import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingBasket } from '@material-ui/icons'
import React from 'react'
import logo from '../../assets/shops.png'
import { useStyles } from "./styles"

export const NavBar: React.FC = (): JSX.Element => {
	const classes = useStyles()
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.title}>
						<img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
						EKBT
					</Typography>
					<div className="classes.grow" />
					<div className={classes.menuButton}>
						<IconButton aria-label="Show cart items" color="inherit">
							<Badge badgeContent={2} color="secondary">
								<ShoppingBasket />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
}