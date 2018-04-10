import React, { Component } from "react";
import Promo from "./promo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    ViewProfile: { screen: Promo }
  },
  {
    initialRouteName: "ViewProfile"
  }
));
