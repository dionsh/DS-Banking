import React, { useEffect, useState } from "react";
import { DrawerActions } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailRow from "../components/DetailRow";

export default function PersonalDetails({ navigation }) {
  const [user, setUser] = useState(null);

  const lightBlue = "#4A90E2";

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      

      <View style={styles.header}>
        <TouchableOpacity 
               onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
               style={styles.drawerButton}
             >
               <MaterialCommunityIcons name="menu" size={28} color={lightBlue} />
             </TouchableOpacity>

        <Text style={styles.title}>Personal Details</Text>

        <View style={{ width: 26 }} />
      </View>

      
      <Text style={styles.sectionTitle}>Basic Information</Text>

      <DetailRow label="Name" value={user.name} />
      <DetailRow label="Surname" value={user.surname} />
      <DetailRow label="Email" value={user.email} />

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
    marginBottom: 35,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 15,
  },
});