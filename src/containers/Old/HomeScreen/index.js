import React, { Component } from "react";
import Main from "./HomeScreen";
import MainScreenNavigator from "../Login/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import Wallet from "../wallet/index";
import Promo from "../Promotion/index";
import Promotion from "../Promo/index";
import Hiring from "../Hire/index";


const HomeScreenRouter = DrawerNavigator(
  

  {
    Home: { screen: Main },
    Login: { screen: MainScreenNavigator },
    UpdateProfile: { screen: ProfileScreen },
    Wallet:{screen:Wallet},
    ViewProfile:{screen:Promo},
    Promotion:{screen:Promotion},
    Hiring:{screen:Hiring}
   
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
