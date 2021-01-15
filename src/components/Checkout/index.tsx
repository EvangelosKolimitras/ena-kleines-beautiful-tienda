import { Box, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { commerceInstance } from '../../lib'
import { AddressForm } from '../AddressForm'
import { Confirmation } from '../Confirmation'
import { PaymentForm } from '../PaymentForm'
import { useStyles } from './styles'

const steps = ['Shipping address', "Payment details"]

interface ICheckoutProps {
	cart: any
}
export const Checkout: React.FC<ICheckoutProps> = (props): JSX.Element => {
	const { cart } = props

	const [activeStep, setActiveStep] = useState(0)
	const initialCheckout = null
	const [checkoutToken, setCheckoutToken] = useState(initialCheckout)

	const classes = useStyles();

	const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken!} /> : <PaymentForm />

	useEffect(() => {
		const generatToke = async () => {
			try {
				const token = await commerceInstance.checkout.generateToken(cart.id, { type: "cart" })
				setCheckoutToken(token)
			} catch (error) { }
		}
		generatToke()
	}, [cart])

	return (
		<>
			<Box component="div" className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography align="center" variant="h4">Checkout</Typography>
					<Stepper className={classes.stepper} activeStep={activeStep}>
						{steps.map((step: any) =>
							<Step key={step}>
								<StepLabel>
									{step}
								</StepLabel>
							</Step>
						)}
					</Stepper>
					{
						activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />
					}
				</Paper>
			</main>
		</>
	)
}