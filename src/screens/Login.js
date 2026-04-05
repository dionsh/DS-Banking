import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [pin, setPin] = useState('');
  const pinInputRef = useRef(null);

  
  const midnightBlue = '#191970';
  const mistGray = '#ECEFF1';

  //Funksioni per login
  const login = async () => {
   
    if (!name || !surname || pin.length !== 4) {
      alert("Please fill in all fields and enter a 4-digit PIN");
      return;
    }

    try {
      // Qon vetem numrat si PIN
      const res = await fetch("http://localhost/dsbanking-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          surname: surname.trim(),
          pin: pin.trim(),
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        //Ruan sessionin e userit
        await AsyncStorage.setItem("user", JSON.stringify(data));
        // Navigimi n'Home
        navigation.replace("MainApp");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

 
  const handlePinChange = (val) => {
  
    const clean = val.replace(/[^0-9]/g, '');
    
    setPin(clean.slice(0, 4));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
 
      <View style={[styles.header, { backgroundColor: midnightBlue }]}>
        <Image 
          source={require('../../assets/images/dsbanklogotr.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: midnightBlue }]}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your secure account</Text>

  
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.usernameInput, { borderColor: mistGray }]}
            placeholder="Name"
            placeholderTextColor="#7A7A7A"
            value={name}
            onChangeText={setName}
          />
        </View>

     
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.usernameInput, { borderColor: mistGray }]}
            placeholder="Surname"
            placeholderTextColor="#7A7A7A"
            value={surname}
            onChangeText={setSurname}
          />
        </View>

        <Text style={[styles.pinLabel, { color: midnightBlue }]}>Enter PIN</Text>

       
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => pinInputRef.current?.focus()}
        >
          <View style={styles.pinContainer}>
            {[1, 2, 3, 4].map((dot, index) => (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  { backgroundColor: pin.length > index ? midnightBlue : mistGray }
                ]} 
              />
            ))}
          </View>
        </TouchableOpacity>

       
        <TextInput
          ref={pinInputRef}
          style={styles.hiddenInput}
          keyboardType="number-pad"
          maxLength={4}
          value={pin}
          onChangeText={handlePinChange}
          caretHidden={true}
        />

       
        <TouchableOpacity 
          style={[styles.primaryBtn, { backgroundColor: midnightBlue }]}
          onPress={login}
        >
          <Text style={styles.primaryBtnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.secondaryBtn, { backgroundColor: mistGray }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.secondaryBtnText, { color: midnightBlue }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#fff' },
  header: { height: 190, backgroundColor: '#191970', borderBottomLeftRadius: 60, borderBottomRightRadius: 60, borderBottomStartRadius: 100, borderBottomEndRadius: 120, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 25, marginBottom: 30 },
  logo: { width: 240, height: 80 },
  content: { paddingHorizontal: 30, alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#757575', marginBottom: 30 },
  inputContainer: { width: '100%', marginBottom: 25 },
  usernameInput: { width: '100%', height: 55, borderWidth: 2, borderRadius: 12, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#FAFAFA' },
  pinLabel: { fontSize: 16, fontWeight: '600', marginBottom: 15 },
  pinContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 40 },
  dot: { width: 15, height: 15, borderRadius: 7.5, marginHorizontal: 15, borderWidth: 1, borderColor: '#ddd' },
  hiddenInput: { position: 'absolute', opacity: 0, width: 0, height: 0 },
  primaryBtn: { width: '100%', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 15, marginTop: 10 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryBtn: { width: '100%', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  secondaryBtnText: { fontSize: 16, fontWeight: 'bold' },
});

export default Login;
