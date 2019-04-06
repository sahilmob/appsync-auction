import { CreateAuctionMutation, CreateAuctionMutationVariables } from "./API";

import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { createAuction } from "./graphql/mutations";
import gql from "graphql-tag";

interface FormValues {
	name: string;
	price: number;
}

export function CreateAuctionForm() {
	return (
		<Mutation<CreateAuctionMutation, CreateAuctionMutationVariables>
			mutation={gql(createAuction)}
		>
			{createAuction => (
				<Formik<FormValues>
					initialValues={{
						name: "",
						price: 0
					}}
					onSubmit={async ({ name, price }) => {
						const response = await createAuction({
							variables: {
								input: {
									name,
									price
								}
							}
						});
						console.log(response);
					}}
				>
					{({ values, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<TextField
								name="name"
								label="Name"
								value={values.name}
								onChange={handleChange}
								margin="normal"
							/>
							<br />
							<TextField
								name="price"
								label="Price"
								value={values.price}
								onChange={handleChange}
								margin="normal"
							/>
							<br />
							<Button variant="contained" type="submit">
								Submit
							</Button>
						</form>
					)}
				</Formik>
			)}
		</Mutation>
	);
}
