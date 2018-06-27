import React, { Component } from 'react'
import Search from '../components/search'

class SearchContainer extends Component {
  state = { // eslint-disable-line no-undef
    value: ''
  }
  handleSubmit = (event) => { // eslint-disable-line no-undef
    event.preventDefault()
    console.log(this.input.value, 'submit')
  }
  setInputRef = (element) => { // eslint-disable-line no-undef
    this.input = element
  }
  handleInputChange = (event) => { // eslint-disable-line no-undef
    this.setState({
      value: event.target.value
    })
  }
  render () {
    return (
      <Search
        setRef={this.setInputRef}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleInputChange}
        value={this.state.value}
      />
    )
  }
}

export default SearchContainer
