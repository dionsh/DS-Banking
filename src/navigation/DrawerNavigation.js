import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabNavigation from "./TabNavigation";
import MyOffers from "../screens/MyOffers";
import Settings from "../screens/Settings";
import Home from "../screens/Home";
import SavingsAccount from "../screens/SavingsAccount";
import Credit from "../screens/Credit";
import PublicServices from "../screens/PublicServices";
import AutomaticOrder from "../screens/AutomaticOrder";
import LogOut from "../screens/LogOut";
import Profile from "../screens/Profile";
import PersonalDetails from "../screens/PersonalDetails";
import Card from "../screens/Card";
import Transfer from "../screens/Transfer";
import Transactions from "../screens/Transactions";
import NOVA from "../screens/NOVA";
import TopUp from "../screens/TopUp";

const Drawer = createDrawerNavigator();

const PRIMARY = "#191970";    // Midnight Blue
const BACKGROUND = "#ECEFF1"; // Mist Gray
const INACTIVE = "#7A7A7A";
const LOGOUT_COLOR = "#FF3B30"; // Ngjyra kuqe per logout

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: PRIMARY,
        drawerInactiveTintColor: INACTIVE,
        drawerActiveBackgroundColor: "#DDE3E8",
        drawerStyle: {
          backgroundColor: BACKGROUND,
          width: 260,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="My Offers"
        component={MyOffers}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="SavingsAccount"
        component={SavingsAccount}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Credit"
        component={Credit}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="PublicServices"
        component={PublicServices}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="AutomaticOrder"
        component={AutomaticOrder}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="autorenew" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-box-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Card"
        component={Card}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Transfer"
        component={Transfer}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank-transfer" color={color} size={size} />
          ),
        }}
      />


      <Drawer.Screen
        name="Transactions"
        component={Transactions}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="swap-horizontal" color={color} size={size} />
          ),
        }}
      />


       <Drawer.Screen
        name="NOVA"
        component={NOVA}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-tie-voice-outline" color={color} size={size} />
          ),
        }}
      />


      <Drawer.Screen
        name="TopUp"
        component={TopUp}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone-plus" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="LogOut"
        component={LogOut}
        options={{
          drawerIcon: ({ size }) => (
            <MaterialCommunityIcons name="logout" color={LOGOUT_COLOR} size={size} />
          ),
          drawerLabelStyle: { color: LOGOUT_COLOR },
        }}
      />
    </Drawer.Navigator>
  );
}