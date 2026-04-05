import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//importi per screens te tab navigator
import Home from "../screens/Home";
import Transfer from "../screens/Transfer";
import MyOffers from "../screens/MyOffers";
import Settings from "../screens/Settings";
import NOVA from "../screens/NOVA";

const Tab = createBottomTabNavigator();

const PRIMARY = "#191970";   // Midnight Blue
const BACKGROUND = "#ECEFF1"; // Mist Gray

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: "#7A7A7A",

        tabBarStyle: {
          backgroundColor: BACKGROUND,
          height: 70,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 8,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Transfer"
        component={Transfer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bank-transfer" color={color} size={size} />
          ),
        }}
      />

    <Tab.Screen
        name="NOVA"
        component={NOVA}
        options={{
          tabBarIcon: ({ color, size }) => (
<MaterialCommunityIcons name="account-tie-voice-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Offers"
        component={MyOffers}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tag-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}




