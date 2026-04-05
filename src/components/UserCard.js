import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserCard({ fullName, cardNumber, balance, userId, navigation }){
  const midnightBlue = '#191970';
  const mistGray = '#ECEFF1';

  return (
    <View style={styles.container}>
      <Text style={[styles.greeting, { color: midnightBlue }]}>
        Hello, {fullName || "User"}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>
          {formatCardNumber(cardNumber)}
        </Text>

        <View style={styles.balanceContainer}>
          <Text style={[styles.balance, { color: midnightBlue }]}>
            {Number(balance || 0).toFixed(2)} EUR
          </Text>
          <MaterialCommunityIcons name="eye-off-outline" size={20} color={midnightBlue} />
        </View>

        <Text style={styles.ibanText}>
          {formatCardNumber(cardNumber)}
        </Text>

        <View style={styles.buttonsRow}>
        <TouchableOpacity
  style={[styles.button, { backgroundColor: midnightBlue }]}
  onPress={() => navigation.navigate("TopUp", { user_id: userId })}
>
            <MaterialCommunityIcons name="phone-plus" size={18} color="#FFF" />
            <Text style={[styles.buttonText, { color: '#FFF' }]}>TopUp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: mistGray }]}>
            <MaterialCommunityIcons name="hands-pray" size={18} color={midnightBlue} />
            <Text style={[styles.buttonText, { color: midnightBlue }]}>KUIK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* Pjesa e kodit per formatter */
function formatCardNumber(number) {
  if (!number) return "0000 0000 0000 0000";
  return String(number).replace(/(\d{4})/g, "$1 ").trim();
}

const styles = StyleSheet.create({
  container: { marginTop: 10, paddingHorizontal: 20 },
  greeting: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },

  card: { 
    backgroundColor: "#fff", 
    borderRadius: 20, 
    padding: 20, 
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  cardNumber: { fontSize: 14, color: '#666', marginBottom: 5 },

  balanceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },

  balance: { fontSize: 28, fontWeight: "bold", marginRight: 10 },
  ibanText: { fontSize: 14, color: '#191970', marginBottom: 20 },
  buttonsRow: { flexDirection: "row", gap: 10 },

  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 12,
    gap: 8
  },
  buttonText: { fontWeight: "bold", fontSize: 14 },
});