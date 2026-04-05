import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar as RNStatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar"; 

import Services from "../components/Services";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function PublicServices() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <StatusBar style="light" />
      
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Public Services</Text>
      </View>

   
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.chooseText}>Choose Payment</Text>

        <Services title="Giro payments" letter="G" color="#C5E1A5" />
        <Services title="Municipal payments" letter="P" color="#90CAF9" />
        <Services title="Tax payments" letter="P" color="#FFAB91" />
        <Services title="Contribution payments" letter="P" color="#CE93D8" />
        <Services title="Customs payments" letter="P" color="#AED581" />
        <Services title="Traffic fines" letter="G" color="#64B5F6" />
        <Services title="Ministry payments" letter="P" color="#FFAB91" />
        <Services title="KRU Prishtina" letter="K" color="#BA68C8" />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mistGray,
  },

  
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: midnightBlue,
    paddingHorizontal: 16,
    
    paddingTop: Platform.OS === "ios" ? 60 : RNStatusBar.currentHeight + 10, 
    paddingBottom: 14,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 14,
  },

 
 chooseText: {
    textAlign: "center",
    marginVertical: 32, 
    fontSize: 16,
    fontWeight: "500", 
    color: "#666",
  },
});