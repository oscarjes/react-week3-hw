import React, { Component } from 'react'
import _ from 'lodash';

export default class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latestCharge: 'None'
    }
    this.createCharge = this.createCharge.bind(this);
  }

  createCharge () {

    this.setState({
      latestCharge: 'Creating token...'
    }, () => {
      this.props.postPublic('tokens', {
        'card[number]': '4242424242424242',
        'card[cvc]': '666',
        'card[exp_month]': '02',
        'card[exp_year]': '2018'
      })
      .then((token) => {
        this.setState({
          latestCharge: 'Creating charge...'
        }); 
        return this.props.postSecret('charges', {
          'amount': 2000,
          'currency': 'usd',
          'description': 'test charge',
          'source': token.id

        })
      })
      .then((charge) => {
        this.setState({
          latestCharge: charge.id
        })
      })
      
    });
    // 1. create a token
    // 2. use the token to create a charge
  }

  render() {
    return (
      <div>
        <h2>Checkout</h2>
        <button onClick={this.createCharge}>Charge</button>
        <p>Latest charge: {this.state.latestCharge}</p>
      </div>
    )
  }
}
