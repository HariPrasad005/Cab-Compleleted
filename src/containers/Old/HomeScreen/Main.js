import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import PageTwo from './PageTwo';

export default class Main extends Component {
  render() {
    return (
      <Router hideNavBar= "true">
        <Scene key="root">
          <Scene key="pageOne" component={PageOne} title="Home Page" initial={true}  />
          <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
        </Scene>
      </Router>
    )
  }
}