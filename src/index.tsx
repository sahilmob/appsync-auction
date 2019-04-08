import * as serviceWorker from "./serviceWorker";

import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import Amplify, { Auth } from "aws-amplify";

import { ApolloProvider } from "react-apollo";
import App from "./App";
import AppSyncConfig from "./aws-exports";
import { AuthLink } from "aws-appsync/lib/link";
import React from "react";
import ReactDOM from "react-dom";

Amplify.configure(AppSyncConfig);

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
