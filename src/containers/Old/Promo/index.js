import React, { Component } from "react";
import Promotion from "./promotion.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Promotion: { screen: Promotion }
  },
  {
    initialRouteName: "Promotion"
  }
));
