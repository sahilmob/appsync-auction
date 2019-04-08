import "./App.css";

import React, { Component } from "react";

import { Auctions } from "./Auctions";
import { CreateAuctionForm } from "./CreateAuctionForm";
import { withAuthenticator } from "aws-amplify-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateAuctionForm />
        <Auctions />
      </div>
    );
  }
}

export default withAuthenticator(App);
