import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreditComponent = ({ title, text }) => {
  return (
    <View style={styles.card}>
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default CreditComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginVertical: 10,


    minHeight: 160,
    justifyContent: "center",
  },

  inner: {
    paddingHorizontal: 22,
    paddingVertical: 26,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  text: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
});
