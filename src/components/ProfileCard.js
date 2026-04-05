import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileCard({ title, description, icon, onPress }) {

  const primaryBlue = "#191970";
  const lightBlue = "#4A90E2";

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color={primaryBlue} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={22} color={lightBlue} />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F9FB",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15, 
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ECEFF1",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  description: {
    fontSize: 12,
    color: "#777",
  },
});