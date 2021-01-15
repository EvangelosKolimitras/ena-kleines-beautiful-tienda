import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { commerceInstance } from '../../lib';

interface IAddressForm {
	checkoutToken: any
	next: Function
}
export const AddressForm: React.FC<IAddressForm> = (props) => {
	const { checkoutToken, next } = props
	const methods = useForm();
	const [shippingCountries, setShippingCountries] = useState<any>([])
	const [shippingCountry, setShippingCountry] = useState("")
	const [shippingSubDivisions, setShippingSubDivisions] = useState<any>([])
	const [shippingSubDivision, setShippingSubDivision] = useState("")
	const [shippingOptions, setShippingOptions] = useState<any>([])
	const [shippingOption, setShippingOption] = useState("")

	const fetchShippingCountries = async (checkoutTokenId: string) => {
		const { countries } = await commerceInstance.services.localeListShippingCountries(checkoutTokenId)
		setShippingCountries(countries)
		setShippingCountry(Object.keys(countries)[0])
	}

	const fetchSubDivisions = async (countryCode: string) => {
		const { subdivisions } = await commerceInstance.services.localeListSubdivisions(countryCode)
		setShippingSubDivisions(subdivisions)
		setShippingSubDivision(Object.keys(subdivisions)[0])
	}

	const fetchShippingOptions = async (checkoutTokenId: string, country: string, region: string | null) => {
		const options = await commerceInstance.checkout.getShippingOptions(checkoutTokenId, { country, region })
		setShippingOptions(options)
		setShippingOption(options[0].id)
	}

	const countries = Object.entries(shippingCountries).map(([code, name]: any) => ({
		id: code,
		label: name
	}))

	const subdivisions = Object.entries(shippingSubDivisions).map(([code, name]: any) => ({
		id: code,
		label: name
	}))

	const options = shippingOptions.map((shippingOption: any) => ({
		id: shippingOption.id,
		label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})`
	}))

	useEffect(() => {
		fetchShippingCountries(checkoutToken.id !== null && checkoutToken.id);
	}, [])

	useEffect(() => {
		shippingCountry && fetchSubDivisions(shippingCountry)
	}, [shippingCountry])

	useEffect(() => {
		shippingSubDivisions && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
	}, [shippingSubDivision])

	return (
		<>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(
					(data: any) => next({ ...data, shippingCountry, shippingOption, shippingSubDivision }))}  >
					<Grid container spacing={3}>
						<TxTField name="firstName" label="First Name" required />
						<TxTField name="lastName" label="Last Name" required />
						<TxTField name="address1" label="Address" required />
						<TxTField name="email" label="Email" required />
						<TxTField name="city" label="City" required />
						<TxTField name="zip" label="Postal code" required />

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e: any) => setShippingCountry(e.target.value)}>
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
						<Grid item xs={12} sm={6}>
							<InputLabel >Shipping Subdivision</InputLabel>
							<Select value={shippingSubDivision} fullWidth onChange={(e: any) => setShippingSubDivision(e.target.value)}>
								{
									subdivisions.map((subDivision: { id: string, label: string }) => {
										return (
											<MenuItem key={subDivision.id} value={subDivision.id} >
												{subDivision.label}
											</MenuItem>
										)
									})
								}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel >Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e: any) => setShippingOption(e.target.value)}>
								{
									options.map((option: { id: string, label: string }) => {
										return (
											<MenuItem key={option.id} value={option.id} >
												{option.label}
											</MenuItem>
										)
									})
								}
							</Select>
						</Grid>
					</Grid>
					<Box component="div" style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
						<Button component={Link} to="/cart" variant="contained" color="primary" >Back to Cart</Button>
						<Button type="submit" variant="contained" color="primary" >Next</Button>
					</Box>
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
	const { name, label } = props
	const { control } = useFormContext()
	return (
		<Grid item xs={12} sm={6}>
			<Controller
				as={TextField}
				control={control}
				fullWidth
				label={label}
				name={name}
				defaultValue=""
			/>
		</Grid>
	)
}