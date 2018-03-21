import React, { Component } from 'react'
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import Main from '../Main/container'

class App extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const {
      phase,
        user,
      } = this.props;    
    return (
      <Router>
        <div className="App-pageContainer">
        <Route exact path="/" component={Main} />
        </div>
      </Router>
    )
  }
}
export default App
