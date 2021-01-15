import { Box, Button, Divider, Typography } from '@material-ui/core'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Review } from '../Review'

interface IPaymentProps {
	checkoutToken: any
	shippingData: {
		firstName: string
		lastName: string
		email: string
		address1: string
		shippingSubdivision: string
		zip: string
		shippingCountry: string
		shippingOption: string
	} | any
	backStep: any
	captureCheckoutHandler: any
	nextStep: Function
}

export const PaymentForm: React.FC<IPaymentProps> = (props) => {
	const { checkoutToken, shippingData, backStep, captureCheckoutHandler, nextStep } = props
	let key: string | undefined = process.env.REACT_APP_STRIPE_PUBLIC_KEY
	const stripePromise: any = loadStripe(key!)

	const submitHandler = async (event: any, elements: any, stripe: any): Promise<void> => {
		event.preventDefault();

		if (!stripe || !elements) return

		const cardElement = elements.getElement(CardElement)

		const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement })

		if (error) {
			console.log(error);
		} else {
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email
				},
				shipping: {
					name: "Primary",
					street: shippingData.address1,
					country_state: shippingData.shippingSubDivision,
					postalCode: shippingData.zip,
					country: shippingData.shippingCountry
				},
				fulfillment: {
					shipping_method: shippingData.shippingOption
				},
				payment: {
					gateway: "string",
					stripe: {
						payment_method_id: paymentMethod.id
					}
				}
			}

			captureCheckoutHandler(checkoutToken.id, orderData)
			console.log(shippingData);

			console.log('before capture', orderData);

			nextStep();
		}
	}

	return (
		<div>
			<h1>PaymentForm</h1>
			<Review checkoutToken={checkoutToken} />
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>Payment methods</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form onSubmit={(e: any) => submitHandler(e, elements, stripe)}>
							<CardElement />
							<Box component="div" style={{ display: "flex", justifyContent: "space-between" }}>
								<Button variant="outlined" onClick={backStep}>Back</Button>
								<Button type="submit" variant="contained" disabled={!stripe} color="primary">
									Pay {checkoutToken.live.subtotal.formatted_with_symbol}
								</Button>
							</Box>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</div>
	)
}