import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import {TabList, Tab} from './Tabs.js';
import Checkout from './Checkout.js';
import {withStripe} from './StripeApi.js';
import ChargesList from './ChargesList.js';

class App extends Component {

  componentDidCatch(error, info) {
    alert(`${info}`, error)
  }

  render() {

    const WrappedCheckout = withStripe(
      Checkout, 
      'PUBLIC_KEY',
      'SECRET_KEY'
    )
    const WrappedChargesList = withStripe(
      ChargesList, 
      'PUBLIC_KEY',
      'SECRET_KEY'
    )
    return (
      <TabList>
        <Tab name="Checkout">
          <WrappedCheckout />
        </Tab>
        <Tab name="Charges">
          <WrappedChargesList />
        </Tab>
      </TabList>
    );
  }
}

export default App;
