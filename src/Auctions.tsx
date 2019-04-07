import { ListAuctionsQuery, ListAuctionsQueryVariables } from "./API";

import { AuctionCard } from "./AuctionCard";
import { Query } from "react-apollo";
import React from "react";
import gql from "graphql-tag";
import { listAuctions } from "./graphql/queries";

export function Auctions() {
	return (
		<Query<ListAuctionsQuery, ListAuctionsQueryVariables>
			query={gql(listAuctions)}
			variables={{ limit: 100 }}
		>
			{({ data, loading }) => {
				if (
					loading ||
					!data ||
					!data.listAuctions ||
					!data.listAuctions.items
				) {
					return null;
				} else {
					console.log(data.listAuctions.items);
					return (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(4, 1fr)",
								gridGap: 10
							}}
						>
							{data!.listAuctions.items.map(a => (
								<AuctionCard key={a!.id} name={a!.name} price={a!.price} />
							))}
						</div>
					);
				}
			}}
		</Query>
	);
}
