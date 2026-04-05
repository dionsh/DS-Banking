import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function Card() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user_id } = route.params || {};

  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funksioni per me ba fetch tdhenat e karteles
  const fetchCardData = async () => {
    if (!user_id) {
      console.log("No user_id received");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost/dsbanking-api/get_card.php?user_id=${user_id}`);
      const data = await res.json();
      console.log("CARD RESPONSE:", data);

      if (data.status === "success") {
        setCardData(data.card);
      } else {
        console.log("CARD ERROR:", data.message);
      }
    } catch (err) {
      console.log("CARD FETCH ERROR:", err);
    }
    setLoading(false);
  };

  //  Kodi per refresh t'screenit ne focus
  useFocusEffect(
    useCallback(() => {
      fetchCardData();
    }, [user_id])
  );

  const maskCard = (num) => {
    if (!num) return "---- ---- ---- ----";
    return num.replace(/(\d{4})\d+(\d{4})/, "$1 **** **** $2");
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: midnightBlue }}>
       
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Card</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      {loading ? (
        <ActivityIndicator size="large" color={midnightBlue} style={{ marginTop: 40 }} />
      ) : (
        <>
          <View style={styles.cardBox}>
            <Text style={styles.visa}>VISA</Text>
            <Text style={styles.cardNumber}>{maskCard(cardData?.card_number)}</Text>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>CVV</Text>
                <Text style={styles.value}>{cardData?.cvv || "---"}</Text>
              </View>
              <View>
                <Text style={styles.label}>Expiry</Text>
                <Text style={styles.value}>{cardData?.expiry_date || "--/--"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Available Condition</Text>
            <Text style={styles.balance}>{cardData?.balance || "0.00"} EUR</Text>

            <Text style={styles.infoLabel}>Account Number</Text>
            <Text style={styles.infoValue}>{cardData?.account_number || "--------"}</Text>
          </View>

          <TouchableOpacity style={styles.walletBtn}>
            <FontAwesome5 name="apple" size={20} color="white" />
            <Text style={styles.walletText}>  Add to Apple Wallet</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mistGray },
  header: {
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: midnightBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  cardBox: {
    backgroundColor: midnightBlue,
    margin: 20,
    borderRadius: 18,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  visa: { color: "white", fontSize: 26, fontWeight: "bold", alignSelf: "flex-end" },
  cardNumber: { color: "white", fontSize: 19, letterSpacing: 2, marginVertical: 25 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#bbb", fontSize: 12 },
  value: { color: "white", fontSize: 17, fontWeight: "600" },
  infoSection: { paddingHorizontal: 20, paddingTop: 10 },
  infoLabel: { color: "#8a8a8a", fontSize: 14, marginTop: 22 },
  balance: { fontSize: 26, fontWeight: "700", marginTop: 5, color: midnightBlue },
  infoValue: { fontSize: 18, marginTop: 6, fontWeight: "500", color: "#222" },
  walletBtn: {
    backgroundColor: "black",
    marginHorizontal: 20,
    marginTop: 35,
    padding: 18,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  walletText: { color: "white", fontSize: 16, fontWeight: "600" },
});