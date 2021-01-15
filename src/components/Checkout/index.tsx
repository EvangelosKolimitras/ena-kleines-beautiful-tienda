import { Box, Paper, Step, StepLabel, Stepper, Typography, Divider, CircularProgress, Button, CssBaseline } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { commerceInstance } from '../../lib'
import { AddressForm } from '../AddressForm'
import { Confirmation } from '../Confirmation'
import { PaymentForm } from '../PaymentForm'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'

const steps = ['Shipping address', "Payment details"]
interface ICheckoutProps {
	cart: any
	order: any
	error: string
	captureCheckoutHandler: any
}

export const Checkout: React.FC<ICheckoutProps> = (props): JSX.Element => {
	const { cart, captureCheckoutHandler, order, error } = props

	const [activeStep, setActiveStep] = useState<number>(0)
	const [checkoutToken, setCheckoutToken] = useState<null>(null)
	const [shippingData, setShippingData] = useState<object>({})
	const classes = useStyles();

	const Form = () => activeStep === 0 ?
		<AddressForm
			checkoutToken={checkoutToken!}
			next={next}
		/> :
		<PaymentForm
			shippingData={shippingData}
			captureCheckoutHandler={captureCheckoutHandler}
			checkoutToken={checkoutToken!}
			backStep={backStep}
			nextStep={nextStep}
		/>

	useEffect(() => {
		const generatToke = async () => {
			try {
				const token = await commerceInstance.checkout.generateToken(cart.id, { type: "cart" })
				setCheckoutToken(token)
			} catch (error) { }
		}
		generatToke()
	}, [cart])

	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

	// The input values in a single object from the AddressForm component
	const next = (data: Function) => {
		setShippingData(data)
		nextStep();
	}

	let Confirmation = () => (order.customer ? (
		<>
			<div>
				<Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
				<Divider className={classes.divider} />
				<Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
			</div>
			<br />
			<Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
		</>
	) : (
			<div className={classes.spinner}>
				<CircularProgress />
			</div>
		));
	if (error) {
		Confirmation = () => (
			<>
				<Typography variant="h5">Error: {error}</Typography>
				<br />
				<Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
			</>
		);
	}

	return (
		<>
			<CssBaseline />
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