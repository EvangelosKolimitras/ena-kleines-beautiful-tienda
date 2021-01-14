import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingBasket } from '@material-ui/icons'
import React from 'react'
import logo from '../../assets/shops.png'
import { useStyles } from "./styles"

interface NavBarProps {
	totatItemsInBasket: number
}

export const NavBar: React.FC<NavBarProps> = (props): JSX.Element => {
	const { totatItemsInBasket } = props
	const classes = useStyles()
	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography variant="h6" color="inherit" className={classes.title}>
						<img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
						EKBT
					</Typography>
					<Box component="div" className="classes.grow" />
					<Box component="div" className={classes.menuButton}>
						<IconButton aria-label="Show cart items" color="inherit">
							<Badge badgeContent={totatItemsInBasket} color="secondary">
								<ShoppingBasket />
							</Badge>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	)
}