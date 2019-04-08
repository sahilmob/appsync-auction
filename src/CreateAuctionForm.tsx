import {
  CreateAuctionMutation,
  CreateAuctionMutationVariables,
  ListAuctionsQuery
} from "./API";

import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { Mutation } from "react-apollo";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { createAuction } from "./graphql/mutations";
import gql from "graphql-tag";
import { listAuctions } from "./graphql/queries";
import { produce } from "immer";

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
          onSubmit={async ({ name, price }, { resetForm }) => {
            const response = await createAuction({
              variables: {
                input: {
                  name,
                  price
                }
              },
              optimisticResponse: {
                createAuction: {
                  __typename: "Auction",
                  id: "-1",
                  name,
                  price
                }
              }
              // this is what returned from createAuction mutation
              // update: (store, { data }) => {
              // 	if (!data || !data.createAuction) {
              // 		return;
              // 	}
              // 	const auction = store.readQuery<ListAuctionsQuery>({
              // 		query: gql(listAuctions),
              // 		variables: { limit: 100 }
              // 	});

              // 	store.writeQuery({
              // 		query: gql(listAuctions),
              // 		variables: {
              // 			limit: 100
              // 		},
              // 		data: produce(auction, ds => {
              // 			ds!.listAuctions!.items!.unshift(data.createAuction);
              // 		})
              // 	});
              // }
              // refetchQueries: [
              // 	{ query: gql(listAuctions), variables: { limit: 100 } }
              // ] this is one way of getting the new data after submitting an auction
            });
            resetForm();
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
