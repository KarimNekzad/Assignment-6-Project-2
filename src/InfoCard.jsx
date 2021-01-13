import React, { Component } from "react"

class CityCard extends Component {
  render() {
    return (
      <div className="zip-container">
        <h4>ZIP: {this.props.zip}</h4>
      </div>
    )
  }
}

export default CityCard
