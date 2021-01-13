import React, { Component } from "react"
import axios from "axios"

import InfoCard from "./InfoCard"

class CitySearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      zips: [],
      zipInfo: [],
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  fetchZip() {
    let link = "https://ctp-zip-api.herokuapp.com/city/" + this.state.city
    axios
      .get(link)
      .then((response) => {
        console.log(response)
        this.setState({ zips: response.data })
        setTimeout(() => {
          console.log("zips:", this.state.zips)
          // for (let i = 0; i < this.state.zips.length; i++) {
          //   this.fetchZipInfo(this.state.zips[i])
          // }
        }, 400)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // fetchZipInfo(zip) {
  //   let link = "http://ctp-zip-api.herokuapp.com/zip/" + zip
  //   axios.get(link).then((response) => {
  //     this.setState({ zipInfo: response.data })
  //   })

  //   setTimeout(() => {
  //     console.log("zipInfo[0]:", this.state.zipInfo[0])
  //   }, 600)
  // }

  async componentDidUpdate(prevProps, prevStates) {
    // prevent infinite API call
    if (prevStates.city !== this.state.city) {
      this.fetchZip()
    }
  }

  onChangeHandler(e) {
    let city = e.target.value
    console.log("City:", city.toUpperCase())
    this.setState({ city: city.toUpperCase() })
  }

  render() {
    console.log("RENDER")
    return (
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="e.g. NYC"
          onChange={(e) => this.onChangeHandler(e)}
        />
        {this.state.zips.map((zip, index) => {
          return <InfoCard zip={zip} key={index} />
        })}
      </div>
    )
  }
}

export default CitySearch
