import { Grid, TextField, Typography, useFormControl } from '@material-ui/core'
import React from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'

export const AddressForm: React.FC = () => {
	const methods = useForm();
	return (
		<>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				<form  >
					<Grid container spacing={3}>
						<TxTField name="firstName" label="First Name" required />
						<TxTField name="lastName" label="Last Name" required />
						<TxTField name="address" label="Address" required />
						<TxTField name="email" label="Email" required />
						<TxTField name="city" label="City" required />
						<TxTField name="zip" label="Postal code" required />
					</Grid>
				</form>
			</FormProvider>
		</>
	)
}


interface TxTProps {
	name: string
	label: string
	required: boolean
}

const TxTField: React.FC<TxTProps> = (props) => {
	const { name, label, required } = props
	const { control } = useFormContext()
	return (
		<Grid item xs={12} sm={6}>
			<Controller
				as={TextField}
				control={control}
				fullWidth
				label={label}
				name={name}
				required={required}
			/>
		</Grid>
	)
}