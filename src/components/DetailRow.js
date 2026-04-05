import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DetailRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#F8F9FB",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },
  value: {
    fontSize: 15,
    color: "#191970",
    fontWeight: "500",
  },
});