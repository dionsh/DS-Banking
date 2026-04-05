
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CountryPicker from "react-native-country-picker-modal";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function TopUp() {
  const navigation = useNavigation();
  const route = useRoute();
  const user_id = route.params?.user_id ?? null;

  const [cardData, setCardData] = useState(null);
  const [loadingCard, setLoadingCard] = useState(true);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [countryCode, setCountryCode] = useState("XK");
  const [callingCode, setCallingCode] = useState("+383");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [amount, setAmount] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverSurname, setReceiverSurname] = useState("");

  const [sending, setSending] = useState(false);

  // fetch t dhanat e karteles
  const fetchCardData = async () => {
    if (!user_id) {
      console.log("No user_id passed to TopUp screen");
      setLoadingCard(false);
      return;
    }

    setLoadingCard(true);
    try {
      const res = await fetch(`http://localhost/dsbanking-api/get_card.php?user_id=${user_id}`);
      const data = await res.json();

      console.log("Card API:", data);

      if (data.status === "success") {
        setCardData(data.card);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      Alert.alert("Error", "Failed to fetch card info");
    }
    setLoadingCard(false);
  };

  // fetch kompanite e mbushjeve
  const fetchCompanies = async () => {
    try {
      const res = await fetch("http://localhost/dsbanking-api/getCompanies.php");
      const data = await res.json();

      if (data.status === "success") {
        setCompanies(data.companies);
      } else {
        console.log("Company error:", data);
        setCompanies([]);
      }
    } catch (err) {
      console.log("Company fetch error:", err);
      setCompanies([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCardData();
      fetchCompanies();
    }, [])
  );

  const handleSelectCompany = (companyId) => {
    setSelectedCompany(companyId);
  };

  const handleAmountButton = (value) => {
    setAmount(value.toString());
  };

  const handleConfirm = async () => {
    if (!selectedCompany) return Alert.alert("Error", "Select a company");
    if (!phoneNumber) return Alert.alert("Error", "Enter phone number");
    if (!amount) return Alert.alert("Error", "Select an amount");
    if (!receiverName || !receiverSurname) return Alert.alert("Error", "Enter receiver name and surname");

    const totalAmount = parseFloat(amount);
    if (cardData.balance < totalAmount) return Alert.alert("Error", "Insufficient balance");

    setSending(true);
    try {
      const response = await fetch("http://localhost/dsbanking-api/topup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          company_id: selectedCompany,
          phone_number: `${callingCode} ${phoneNumber}`,
          amount: totalAmount,
          receiver_name: receiverName,
          receiver_surname: receiverSurname,
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        Alert.alert("Success", "Phone Charge sent");
        setCardData({ ...cardData, balance: (cardData.balance - totalAmount).toFixed(2) });
        setSelectedCompany(null);
        setPhoneNumber("");
        setAmount("");
        setReceiverName("");
        setReceiverSurname("");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to send top-up");
    }
    setSending(false);
  };

  return (
    <View style={styles.container}>
      
      <SafeAreaView edges={['top']} style={styles.safeAreaTop}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>TopUp</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <View style={styles.contentBody}>
        {loadingCard ? (
          <ActivityIndicator size="large" color={midnightBlue} style={{ marginTop: 40 }} />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
           
            {!cardData ? (
              <Text style={{ textAlign: "center" }}>No card found for this user.</Text>
            ) : (
              <View style={styles.cardInfo}>
                <Text style={styles.label}>From:</Text>
                <Text style={styles.cardNumber}>{cardData.card_number}</Text>
                <Text style={styles.label}>Balance:</Text>
                <Text style={styles.balance}>{cardData.balance} EUR</Text>
              </View>
            )}

          
            <Text style={[styles.sectionTitle, { textAlign: "left" }]}>Choose Company</Text>
            <View style={styles.companyContainer}>
              {Array.isArray(companies) && companies.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => handleSelectCompany(c.id)}
                  style={[
                    styles.companyButton,
                    selectedCompany === c.id && { borderColor: midnightBlue, borderWidth: 2 },
                  ]}
                >
                 
<Image 
  source={{ uri: `http://localhost/dsbanking-api/${c.image_url}` }} 
  style={styles.companyImage} 
/>
                  <Text style={styles.companyText}>{c.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

           
            <Text style={styles.sectionTitle}>Phone Number</Text>
            <View style={styles.phoneRow}>
              <CountryPicker
                countryCode={countryCode}
                withCallingCode
                withFlag
                withFilter
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(`+${country.callingCode[0]}`);
                }}
                containerButtonStyle={styles.countryPicker}
              />
              <TextInput
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

     
            <Text style={styles.sectionTitle}>Sum</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="0.00 EUR"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.amountButtons}>
              {[1, 3, 5, 10].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={styles.amountButton}
                  onPress={() => handleAmountButton(val)}
                >
                  <Text style={styles.amountButtonText}>{val} EUR</Text>
                </TouchableOpacity>
              ))}
            </View>

     
            <Text style={styles.sectionTitle}>Receiver Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={receiverName}
              onChangeText={setReceiverName}
            />
            <Text style={styles.sectionTitle}>Receiver Surname</Text>
            <TextInput
              style={styles.input}
              placeholder="Surname"
              value={receiverSurname}
              onChangeText={setReceiverSurname}
            />

          
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} disabled={sending}>
              <Text style={styles.confirmText}>{sending ? "Sending..." : "Confirm"}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: mistGray },
  safeAreaTop: { backgroundColor: midnightBlue },
  contentBody: { flex: 1, backgroundColor: mistGray },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: midnightBlue,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "600" },

  scrollContainer: { padding: 20 },
  

  cardInfo: { marginBottom: 20, alignItems: "center" },
  label: { fontSize: 14, color: "#555", marginTop: 10 },
  cardNumber: { fontSize: 18, fontWeight: "600", color: "#222", marginTop: 5 },
  balance: { fontSize: 20, fontWeight: "700", color: midnightBlue },

  
  sectionTitle: { fontSize: 16, fontWeight: "600", marginTop: 20, marginBottom: 10, textAlign: "center" },

  companyContainer: { 
  flexDirection: "row", 
  justifyContent: "flex-start", 
  flexWrap: "wrap"              
},

companyButton: { 
  alignItems: "center", 
  padding: 10, 
  borderRadius: 10, 
  backgroundColor: "#fff",
  marginRight: 15,              
  marginBottom: 10              
},
  companyImage: { width: 80, height: 50, resizeMode: "contain" },
  companyText: { marginTop: 5, fontSize: 14 },

  phoneRow: { flexDirection: "row", alignItems: "center" },
  countryPicker: { marginRight: 10 },
  
  
  phoneInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlign: "center",
  },

  amountInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
  },
  amountButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  amountButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  amountButtonText: { fontWeight: "600", color: midnightBlue },

  
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    textAlign: "center",
  },

  confirmButton: {
    backgroundColor: midnightBlue,
    paddingVertical: 18,
    borderRadius: 16,
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});