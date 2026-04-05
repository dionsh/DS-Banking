import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function Transfer() {
  const navigation = useNavigation();

  const [sender, setSender] = useState({});
  const [amount, setAmount] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverSurname, setReceiverSurname] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSender = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user")); 
      if (!user) return;
      setSender({
  user_id: user.user_id,
  name: user.name,
  surname: user.surname,
  email: user.email, 
  account_number: user.account_number,
  balance: user.balance,
});
  
    };
    fetchSender();
  }, []);

  const handleTransfer = async () => {
    if (!amount || (!receiverEmail && !receiverName && !receiverSurname)) {
      Alert.alert("Error", "Please enter amount and receiver info");
      return;
    }

    try {
      const response = await fetch("http://localhost/dsbanking-api/transfer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: sender.user_id,
          amount: parseFloat(amount),
          receiver_email: receiverEmail,
          receiver_name: receiverName,
          receiver_surname: receiverSurname,
          message,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // E bane update balancen e njerit qe dergon pare lokalisht
        const updatedUser = {
          ...sender,
          balance: parseFloat(sender.balance) - parseFloat(amount),
         
        };

        // E run updated user n AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        // e ban update local state
        setSender(updatedUser);

        // i tregon userit a u ba transfer me sukses a qysh
        Alert.alert("Success", data.message, [
          {
            text: "OK",
            onPress: () => navigation.goBack(), 
          },
        ]);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
  <SafeAreaView style={styles.container}>
 
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons name="menu" size={28} color={midnightBlue} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Send Money</Text>

      <View style={{ width: 28 }} />
    </View>

    <ScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
       
      <Text style={styles.label}>Amount</Text>
<TextInput
  style={[styles.input, { 
    fontSize: 22, 
    fontWeight: "600",
    textAlign: "center"
  }]}
  keyboardType="numeric"
  placeholder="0.00 EUR"
  placeholderTextColor="#A0AEC0"
  value={amount}
  onChangeText={setAmount}
/>

       
        <Text style={styles.label}>Receiver Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={receiverName}
          onChangeText={setReceiverName}
        />

        <Text style={styles.label}>Receiver Surname</Text>
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={receiverSurname}
          onChangeText={setReceiverSurname}
        />

        <Text style={styles.label}>Receiver Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@example.com"
          keyboardType="email-address"
          value={receiverEmail}
          onChangeText={setReceiverEmail}
        />

     
        <Text style={styles.label}>Message (optional)</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          placeholder="Add a note..."
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleTransfer}>
          <Text style={styles.buttonText}>Send Transfer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#0B1C39",
    letterSpacing: 0.5,
  },

  formContainer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  label: {
    fontSize: 12,
    color: "#7A869A",
    marginTop: 20,
    marginBottom: 8,
    letterSpacing: 1,
  },

  input: {
    backgroundColor: "#FAFBFD",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E4E7EC",
    color: "#111",
  },

  button: {
    backgroundColor: "#0B1C39",
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 35,
    shadowColor: "#0B1C39",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 1,
  },
});