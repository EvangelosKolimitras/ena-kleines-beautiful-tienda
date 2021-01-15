import { Grid, InputLabel, MenuItem, Select, TextField, Typography, useFormControl } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { commerceInstance } from '../../lib';

interface IAddressForm {
	checkoutToken: any
}
export const AddressForm: React.FC<IAddressForm> = (props) => {
	const { checkoutToken } = props
	const methods = useForm();
	const [shippingCountries, setShippingCountries] = useState([])
	const [shippingCoutry, setShippingCoutry] = useState("")
	const [shippingSubDivisions, setShippingSubDivisions] = useState([])
	const [shippingSubDivision, setShippingSubDivision] = useState()
	const [shippingOptions, setShippingOptions] = useState([])
	const [shippingOption, setShippingOption] = useState("")

	const fetchShippingCountries = async (checkoutTokenId: string) => {
		const { countries } = await commerceInstance.services.localeListShippingCountries(checkoutTokenId)
		console.log(countries);
		setShippingCoutry(Object.keys(countries)[0])
		setShippingCountries(countries)
	}

	useEffect(() => {
		fetchShippingCountries(checkoutToken !== null && checkoutToken.id);
	}, [])

	const countries = Object.entries(shippingCountries).map(([code, name]: any) => ({
		id: code,
		label: name
	}))

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

						<Grid item xs={12} sm={6}>
							<InputLabel >Shipping Country</InputLabel>
							<Select value={shippingCoutry} fullWidth onChange={(e: any) => setShippingCoutry(e.target.value)}>
								{
									countries.map((country: { id: string, label: string }) => {
										return (
											<MenuItem key={country.id} value={country.id} >
												{country.label}
											</MenuItem>
										)
									})
								}

							</Select>
						</Grid>
						{/* 	<Grid item xs={12} sm={6}>
							<InputLabel >Shipping Subdivision</InputLabel>
							<Select value={ } fullWidth onChange={ }>
								<MenuItem key={ } value={ }>
									Selectme
								</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel >Shipping Options</InputLabel>
							<Select value={ } fullWidth onChange={ }>
								<MenuItem key={ } value={ }>
									Selectme
								</MenuItem>
							</Select>
						</Grid> */}
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