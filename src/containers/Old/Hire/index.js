import React, { Component } from "react";
import Hiring from "./Book.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator(
  {
    Hiring:{screen:Hiring}
  },
  {
    initialRouteName: "Hiring"
  }
));
