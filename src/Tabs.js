import React, { Component } from 'react'

export class TabList extends Component {

  constructor(props){
    super(props);
    let defaultTab = React.Children.toArray(props.children).map((child) => child.props.name)[0];
    React.Children.forEach(props.children, (child) => {
      if (child.props.default) {
        defaultTab = child.props.name;
      }
    });
    this.state = {
      selected: defaultTab
    }
  }

  selected(item) {
    this.setState({
      selected: item
    })
  }

  render() {

    const tabs = React.Children.map(this.props.children, (child) => {
      const tabName = child.props.name;
      const className = (tabName === this.state.selected) ? "selected" : "unselectedk"

      return (
        <h1 className={className} onClick={(e) => this.selected(tabName)}>{tabName}</h1>
      )
    });
    let body
    React.Children.forEach(this.props.children, (child) => {
      if (child.props.name === this.state.selected) {
        body = child;
      }
    });

    return (
      <div>
        <div className="holder">
          <div className="tabs">
            {tabs}
          </div>
          <div className="body">
            {body}
          </div>
        </div>
      </div>
    )
  }
}

export class Tab extends Component {
  render() {
    return (
      this.props.children
    )
  }
}
