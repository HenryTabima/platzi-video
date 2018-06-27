import React, { Component } from 'react'
import RegularError from '../components/regular-error'

class HandleError extends Component {
  state = { // eslint-disable-line no-undef
    handleError: false
  }
  componentDidCatch (error, info) {
    console.log(error)
    this.setState({
      handleError: true
    })
  }
  render () {
    if (this.state.handleError) return <RegularError />
    return this.props.children
  }
}

export default HandleError
