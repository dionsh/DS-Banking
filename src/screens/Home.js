import React, { useState, useCallback } from "react";
import { DrawerActions, useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UserCard from "../components/UserCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const midnightBlue = '#191970';
  const mistGray = '#ECEFF1';

  const [user, setUser] = useState(null);

useFocusEffect(
  useCallback(() => {
    const loadFreshBalance = async () => {
      try {
        const stored = await AsyncStorage.getItem("user");
        if (!stored) return;
        const parsed = JSON.parse(stored);

        // Kodi per me i ba fetch tdhanat ma t reja prej get_card.php varesisht prej id t'userit
        const res = await fetch(`http://localhost/dsbanking-api/get_card.php?user_id=${parsed.user_id}`);
        const data = await res.json();

        if (data.status === "success") {
          setUser({
            id: parsed.user_id,
            name: parsed.name,
            surname: parsed.surname,
            email: parsed.email,
            account_number: data.card.card_number, 
            balance: Number(data.card.balance) || 0, 
          });
        }
      } catch (err) {
        console.log("Failed to refresh balance:", err);
      }
    };

    loadFreshBalance();
  }, [])
);

  const ServiceBtn = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.serviceBtn} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: mistGray }]}>
        <MaterialCommunityIcons name={icon} size={26} color={midnightBlue} />
      </View>
      <Text style={[styles.serviceLabel, { color: midnightBlue }]}>{label}</Text>
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: midnightBlue }]}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Primary</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
            <MaterialCommunityIcons name="email-outline" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color="#FFF" style={{marginLeft: 15}} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
       <UserCard
  fullName={`${user.name} ${user.surname}`}
  cardNumber={user.account_number}
  balance={user.balance}
  userId={user.id}
  navigation={navigation}
/>

        <View style={styles.gridContainer}>
          <ServiceBtn icon="swap-horizontal" label="Transactions" onPress={() => navigation.navigate('Transactions')} />
          <ServiceBtn icon="file-document-outline" label="Public Services" onPress={() => navigation.navigate('PublicServices')} />
          <ServiceBtn icon="refresh" label="Automatic Order" onPress={() => navigation.navigate('AutomaticOrder')} />
          <ServiceBtn icon="credit-card-outline" label="Card" onPress={() => navigation.navigate("Card", { user_id: user.id })} />
        </View>

     <View style={styles.promoContainer}>
  
  <TouchableOpacity 
    style={styles.promoBox}
    onPress={() => navigation.navigate("SavingsAccount")}
  >
     <Image 
       source={require('../../assets/images/svgacc.png')}
         style={{ width: 180, height: 180 }}
        resizeMode="contain"
     />
     
  </TouchableOpacity>
  
  <TouchableOpacity 
    style={styles.promoBox}
    onPress={() => navigation.navigate("Credit")}
  >
     <Image 
       source={require('../../assets/images/credittt.jpg')}
         style={{ width: 180, height: 180 }}
        resizeMode="contain"
     />
    
  </TouchableOpacity>

</View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  headerIcons: { flexDirection: 'row' },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  serviceBtn: { width: '23%', alignItems: 'center', marginBottom: 20 },
  iconBox: { 
    width: 60, 
    height: 60, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 8
  },
  serviceLabel: { fontSize: 10, textAlign: 'center', fontWeight: '600' },
  promoContainer: { flexDirection: 'row', padding: 20, justifyContent: 'space-between' },
  promoBox: { width: '47%', backgroundColor: '#fff', borderRadius: 20, elevation: 3, padding: 15, alignItems: 'center' },
  promoImgPlaceholder: { width: '100%', height: 80, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  promoText: { fontWeight: 'bold', fontSize: 13, textAlign: 'center' },

  promoImage: {
  width: 60,
  height: 60,
  marginBottom: 10,
},
});