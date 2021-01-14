import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingBasket } from '@material-ui/icons'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/shops.png'
import { useStyles } from "./styles"

interface NavBarProps {
	totatItemsInBasket: number
}

export const NavBar: React.FC<NavBarProps> = (props): JSX.Element => {
	const { totatItemsInBasket } = props
	const location = useLocation().pathname;
	const classes = useStyles()

	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
						<img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
						EKBT
					</Typography>
					<Box component="div" className="classes.grow" />
					{
						// If we are on the /cart route then we do not render the cart icon
						location === "/" &&
						<Box component="div" className={classes.menuButton}>
							<IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
								<Badge badgeContent={totatItemsInBasket} color="secondary">
									<ShoppingBasket />
								</Badge>
							</IconButton>
						</Box>
					}
				</Toolbar>
			</AppBar>
		</>
	)
}