import React from 'react'
import { Review } from '../Review'

interface IPaymentProps {
	checkoutToken: any
	shippingData: object
}
export const PaymentForm: React.FC<IPaymentProps> = (props) => {
	return (
		<div>
			<h1>PaymentForm</h1>
			<Review checkoutToken={props.checkoutToken} />
		</div>
	)
}