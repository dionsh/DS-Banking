import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function NOVA() {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [cardData, setCardData] = useState(null);
  const [loadingReply, setLoadingReply] = useState(false);

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem("user");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      setUser(parsed);

      setMessages([
        {
          id: 1,
          sender: "bot",
          text: `Hello ${parsed.name} 👋\nI'm NOVA, your DS Banking assistant.\nHow can I help you today?`,
        },
      ]);
    };

    loadUser();
  }, []);

  // fetch kartelen edhe acc t userit
  const fetchCardData = async () => {
    if (cardData || !user?.user_id) return;

    try {
      const res = await fetch(
        `http://localhost/dsbanking-api/get_card.php?user_id=${user.user_id}`
      );
      const data = await res.json();

      if (data.status === "success") {
        setCardData(data.card);
        return data.card;
      }
    } catch (err) {
      console.log("NOVA FETCH ERROR:", err);
    }
    return null;
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender, text },
    ]);
  };

  const handleAction = async (type, label) => {
    addMessage("user", label);
    setLoadingReply(true);

    let data = cardData || (await fetchCardData());

    setTimeout(() => {
      let reply = "Sorry, something went wrong.";

      if (!data) {
        reply = "Unable to retrieve your account data.";
      } else {
        switch (type) {
          case "balance":
            reply = `💰 Your current balance is €${data.balance}`;
            break;
          case "expiry":
            reply = `💳 Your card expires on ${data.expiry_date}`;
            break;
          case "account":
            reply = `🏦 Your account number is ${data.account_number}`;
            break;
          case "cvv":
            reply = `🔐 Your CVV is ${data.cvv}`;
            break;
          case "card":
            reply = `💳 Your card number is ${data.card_number}`;
            break;
        }
      }

      addMessage("bot", reply);
      setLoadingReply(false);
    }, 1000);
  };

  const QuickButton = ({ label, type }) => (
    <TouchableOpacity
      style={styles.quickBtn}
      onPress={() => handleAction(type, label)}
    >
      <Text style={styles.quickText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user"
          ? styles.userBubble
          : styles.botBubble,
      ]}
    >
      <Text style={item.sender === "user" ? styles.userText : styles.botText}>
        {item.text}
      </Text>
    </View>
  );

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={midnightBlue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: midnightBlue }}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }
          >
            <MaterialCommunityIcons name="menu" size={28} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>NOVA</Text>
          <View style={{ width: 28 }} />
        </View>
      </SafeAreaView>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
      />

      {loadingReply && (
        <ActivityIndicator
          size="small"
          color={midnightBlue}
          style={{ marginBottom: 10 }}
        />
      )}

      <View style={styles.quickContainer}>
        <QuickButton label="💰 What's my balance?" type="balance" />
        <QuickButton label="💳 My card expiry date" type="expiry" />
        <QuickButton label="🏦 My account number" type="account" />
        <QuickButton label="🔐 Show my CVV" type="cvv" />
        <QuickButton label="💳 Show my card number" type="card" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  header: {
    paddingTop: 12,
    paddingBottom: 22,
    paddingHorizontal: 20,
    backgroundColor: midnightBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    letterSpacing: 1,
  },

  messageBubble: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginVertical: 6,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  botBubble: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderTopLeftRadius: 5,
  },

  userBubble: {
    backgroundColor: midnightBlue,
    alignSelf: "flex-end",
    borderTopRightRadius: 5,
  },

  botText: {
    color: "#1E1E1E",
    fontSize: 15,
    lineHeight: 20,
  },

  userText: {
    color: "white",
    fontSize: 15,
    lineHeight: 20,
  },

  quickContainer: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },

  quickBtn: {
    backgroundColor: "#EEF1F7",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 14,
    marginBottom: 10,
  },

  quickText: {
    fontWeight: "600",
    fontSize: 14,
    color: midnightBlue,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});