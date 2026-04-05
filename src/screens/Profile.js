import React from "react";
import { DrawerActions } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProfileCard from "../components/ProfileCard";


export default function Profile({ navigation }) {

  const primaryBlue = "#191970";
  const lightBlue = "#4A90E2";
  const dangerRed = "#E53935";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
  
      <View style={styles.header}>
        <TouchableOpacity 
               onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
               style={styles.drawerButton}
             >
               <MaterialCommunityIcons name="menu" size={28} color={lightBlue} />
             </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate("LogOut")}>
          <Ionicons name="log-out-outline" size={26} color={dangerRed} />
        </TouchableOpacity>
      </View>

     
      <Image
        source={require('../../assets/images/dsbanklogotr.png')}
        style={styles.logo}
      />

      <TouchableOpacity>
        <Text style={styles.changeAvatar}>Change avatar</Text>
      </TouchableOpacity>

     
      <Text style={styles.sectionTitle}>Personal</Text>

      <ProfileCard
        title="Personal Details"
        description="View and update your personal information"
        icon="person-outline"
        onPress={() => navigation.navigate("PersonalDetails")}
      />

      <ProfileCard
        title="Contact Details"
        description="View and update your contact information"
        icon="call-outline"
      />

      <Text style={styles.sectionTitle}>Other</Text>

      <ProfileCard
        title="Settings"
        description="Manage app settings"
        icon="settings-outline"
        onPress={() => navigation.navigate("Settings")}
      />

      <ProfileCard
        title="Notifications"
        description="Check your notifications"
        icon="notifications-outline"
        onPress={() => navigation.navigate("Notifications")}
      />

      <ProfileCard
        title="Help"
        description="Frequently asked questions"
        icon="help-circle-outline"
        onPress={() => navigation.navigate("Help")}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60, 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 10,
  },
  changeAvatar: {
    textAlign: "center",
    color: "#4A90E2",
    marginBottom: 35,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 15,
    marginTop: 10,
  }
});