import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function Settings() {
  const navigation = useNavigation();

  const [selectedVersion, setSelectedVersion] = useState("light");
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color={mistGray} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        
        <View style={{ width: 28 }} />
      </View>

    
      <View style={styles.content}>

        
        <Text style={styles.sectionTitle}>Choose Version</Text>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setSelectedVersion("light")}
        >
          <Text style={styles.optionText}>Light version</Text>

          {selectedVersion === "light" && (
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color={midnightBlue}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setSelectedVersion("dark")}
        >
          <Text style={styles.optionText}>Dark version</Text>

          {selectedVersion === "dark" && (
            <MaterialCommunityIcons
              name="check-circle"
              size={22}
              color={midnightBlue}
            />
          )}
        </TouchableOpacity>

       
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Notifications from DS Banking
        </Text>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Allow notifications</Text>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#ccc", true: midnightBlue }}
            thumbColor="#fff"
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#191970", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  content: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: midnightBlue,
    marginBottom: 15,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  optionText: {
    fontSize: 15,
    color: "#333",
  },
});