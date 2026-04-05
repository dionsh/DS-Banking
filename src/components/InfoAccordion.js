import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const midnightBlue = "#191970";

export default function InfoAccordion({ title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setOpen(!open)}
        activeOpacity={0.7}
      >
        <Text style={styles.title}>{title}</Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.body}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingVertical: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 15,
    color: "#222",
  },

  body: {
    paddingTop: 10,
    paddingRight: 20,
  },

  text: {
    color: "#666",
    lineHeight: 20,
    fontSize: 14,
  },
});
