import { ListAuctionsQuery, ListAuctionsQueryVariables } from "./API";

import { AuctionCard } from "./AuctionCard";
import { OnMount } from "./components/OnMount";
import { Query } from "react-apollo";
import React from "react";
import { buildSubscription } from "aws-appsync";
import gql from "graphql-tag";
import { listAuctions } from "./graphql/queries";
import { onCreateAuction } from "./graphql/subscriptions";

export function Auctions() {
  return (
    <Query<ListAuctionsQuery, ListAuctionsQueryVariables>
      query={gql(listAuctions)}
      variables={{ limit: 100 }}
    >
      {({ data, loading, subscribeToMore }) => {
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
              <OnMount
                onEffect={() => {
                  return subscribeToMore(
                    buildSubscription(gql(onCreateAuction), gql(listAuctions))
                  );
                }}
              />
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
