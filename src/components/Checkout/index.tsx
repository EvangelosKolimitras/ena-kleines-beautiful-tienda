import { Box, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { AddressForm } from '../AddressForm'
import { Confirmation } from '../Confirmation'
import { PaymentForm } from '../PaymentForm'
import { useStyles } from './styles'

const steps = ['Shipping address', "Payment details"]
export const Checkout: React.FC = (): JSX.Element => {
	const [activeStep, setActiveStep] = useState(0)
	const classes = useStyles();

	const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />

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
						activeStep === steps.length ? <Confirmation /> : <Form />
					}
				</Paper>
			</main>
		</>
	)
}