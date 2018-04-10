import React, { Component } from "react";
import logout from "./logout.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    logout: { screen: logout }
  },
  {
    initialRouteName: "Promo"
  }
));
