import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function AutomaticOrder() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Pjesa e kodit per header*/}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons 
            name="menu" 
            size={28} 
            color="#fff" 
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Automatic Order</Text>
      </View>

      {/* Seach bar  */}
      <View style={styles.searchWrapper}>
        <MaterialCommunityIcons 
          name="magnify" 
          size={20} 
          color="#666" 
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#777"
          style={styles.searchBar}
        />
      </View>

      {/* Karta  */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Automatic Order</Text>
      </View>

    
      <TouchableOpacity style={styles.newOrderBtn}>
        <MaterialCommunityIcons name="plus" size={22} color="#fff" />
        <Text style={styles.newOrderText}>New Order</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },


  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: midnightBlue,
    paddingHorizontal: 18,
    paddingTop: 60,
    paddingBottom: 18,
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 14,
    color: "#fff",
  },

 
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: mistGray,
    borderRadius: 12,
    marginHorizontal: 18,
    marginBottom: 18,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
  },


  card: {
    backgroundColor: mistGray,
    borderRadius: 18,
    height: 420,   
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 22,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: midnightBlue,
  },

  
  newOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: midnightBlue,
    paddingVertical: 15,
    borderRadius: 14,
    marginHorizontal: 18,
  },
  newOrderText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#E8ECFF",   
  },
});
