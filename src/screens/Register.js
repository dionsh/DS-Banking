import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    pin: ''
  });

  
  const midnightBlue = '#191970';
  const mistGray = '#ECEFF1';

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // funksioni per mu regjistru
  const signup = async () => {
   
    if (!formData.name || !formData.surname || !formData.email || !formData.password || !formData.pin) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http:/localhost/dsbanking-api/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
          pin: formData.pin,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert("Account created!");
        console.log(data);
        navigation.navigate("Login"); 
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
     
        <View style={[styles.header, { backgroundColor: midnightBlue }]}>
          <Image 
            source={require('../../assets/images/dsbanklogotr.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: midnightBlue }]}>Register</Text>
          <Text style={styles.subtitle}>Create your secure banking profile</Text>

         
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { borderColor: mistGray }]}
              placeholder="Name"
              placeholderTextColor="#7A7A7A"
              value={formData.name}
              onChangeText={(val) => handleInputChange('name', val)}
            />
            <TextInput
              style={[styles.input, { borderColor: mistGray }]}
              placeholder="Surname"
              placeholderTextColor="#7A7A7A"
              value={formData.surname}
              onChangeText={(val) => handleInputChange('surname', val)}
            />
            <TextInput
              style={[styles.input, { borderColor: mistGray }]}
              placeholder="Email Address"
              placeholderTextColor="#7A7A7A"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(val) => handleInputChange('email', val)}
            />
            <TextInput
              style={[styles.input, { borderColor: mistGray }]}
              placeholder="Password"
              placeholderTextColor="#7A7A7A"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(val) => handleInputChange('password', val)}
            />
            <TextInput
              style={[styles.input, { borderColor: mistGray }]}
              placeholder="Set 4-Digit PIN"
              placeholderTextColor="#7A7A7A"
              keyboardType="number-pad"
              maxLength={4}
              value={formData.pin}
              onChangeText={(val) => handleInputChange('pin', val)}
            />
          </View>

          
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: midnightBlue }]}
            onPress={signup}  
          >
            <Text style={styles.primaryBtnText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryBtn, { backgroundColor: mistGray }]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={[styles.secondaryBtnText, { color: midnightBlue }]}>Go Back</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
 header: {
  height: 190,
  backgroundColor: '#191970',
  borderBottomLeftRadius: 60,
  borderBottomRightRadius: 60,
  borderBottomStartRadius: 100,
  borderBottomEndRadius: 120,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingBottom: 25,
  marginBottom: 30,
},
logo: {
  width: 240,
  height: 80,
},
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#757575',
    marginBottom: 25,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },
  primaryBtn: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
