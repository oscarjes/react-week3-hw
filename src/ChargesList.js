import React, { Component } from 'react'

export default class ChargesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charges: [],
      loading: false
    }
    this.getCharges = this.getCharges.bind(this);
  }

  getCharges () {
    this.setState({
      loading: true
    }, () => {
      this.props.getCharges('charges', {})
      .then((charges) => {
         this.setState({
          charges: charges.data,
          loading: false
        })
      })
    })
    };

  render() {
    let charges = this.state.charges
    return (
      <div>
        <h2>Previous Charges:</h2>
        <button onClick={this.getCharges}>Retrieve Charges</button>
        <ul>
          {
           charges.map((item,i) => <li key={i}>{item.id}</li>)           
         }
        </ul>
      </div>
    )
  }
}
