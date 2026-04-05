import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function Transactions() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

 useFocusEffect(
  useCallback(() => {
    setLoading(true);
    fetchUserAndTransactions();
  }, [])
);

  const fetchUserAndTransactions = async () => {
  try {
    const storedUser = JSON.parse(await AsyncStorage.getItem("user"));
    if (!storedUser) return;

    // 1. Fetch balancen edhe kartelen prej backend tdsbanking
    const cardRes = await fetch(`http://localhost/dsbanking-api/get_card.php?user_id=${storedUser.user_id}`);
    const cardData = await cardRes.json();

    if (cardData.status === "success") {
      // e ndryshon user state me balance t'tanishme
      const updatedUser = { 
        ...storedUser, 
        balance: cardData.card.balance 
      };
      setUser(updatedUser);
      
     
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      setUser(storedUser); 
    }

    // 2. fetch listen e transaksioneve
    const transRes = await fetch(
      `http://localhost/dsbanking-api/get_transactions.php?user_id=${storedUser.user_id}`
    );
    const transData = await transRes.json();

    if (transData.status === "success") {
      setTransactions(transData.transactions);
    }
  } catch (error) {
    console.log("Fetch error:", error);
  } finally {
    setLoading(false);
  }
};

const renderItem = ({ item }) => {

  const isSender = item.sender_name === user.name 
    && item.sender_surname === user.surname;

  const amount = parseFloat(item.amount).toFixed(2);
  const amountColor = isSender ? "#222" : "#2E7D32";
  const amountText = isSender 
    ? `- ${amount} EUR` 
    : `+ ${amount} EUR`;

  
  const title = isSender
    ? `${item.receiver_name} ${item.receiver_surname}`
    : `${item.sender_name} ${item.sender_surname}`;

  return (
    <View style={styles.transactionRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{title}</Text>

       
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}

        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleDateString("de-DE")}
        </Text>
      </View>

      <Text style={[styles.amount, { color: amountColor }]}>
        {amountText}
      </Text>
    </View>
  );
};
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={midnightBlue} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" size={28} color={midnightBlue} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Transactions</Text>

        <View style={{ width: 28 }} />
      </View>

      
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>AVAILABLE CONDITION</Text>
        <Text style={styles.balanceValue}>
          {parseFloat(user.balance).toFixed(2)} EUR
        </Text>
      </View>

      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
      />
    </SafeAreaView>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: midnightBlue,
  },

  balanceContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },

  balanceLabel: {
    fontSize: 12,
    letterSpacing: 1,
    color: "#555",
  },

  balanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: midnightBlue,
    marginTop: 5,
  },

  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

 description: {
  fontSize: 15,          
  fontWeight: "500",     
  color: "#333",        
  marginTop: 6,
},

  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },

  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
});