import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  
} from 'react-native';

const SignUp = ({ navigation }) => {
  const [pin, setPin] = useState('');

  
  const midnightBlue = '#191970';
  const mistGray = '#ECEFF1';

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
      
          <View style={styles.toggleContainer}>
            <TouchableOpacity style={[styles.toggleBtn, styles.activeToggle]}>
              <Text style={styles.activeToggleText}>Personal Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleBtn}>
              <Text style={styles.toggleText}>Business Account</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { color: midnightBlue }]}>Enter your PIN</Text>
          <Text style={styles.subtitle}>Change login method?</Text>

     
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

        
          <TextInput
            style={styles.hiddenInput}
            keyboardType="number-pad"
            maxLength={4}
            value={pin}
            onChangeText={setPin}
           
          />

      
          <TouchableOpacity 
            style={[styles.primaryBtn, { backgroundColor: midnightBlue }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryBtnText}>Enter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryBtn, { backgroundColor: mistGray }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.secondaryBtnText, { color: midnightBlue }]}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBtn}>
            <Text style={[styles.linkText, { color: midnightBlue }]}>Open individual account</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    padding: 4,
    marginBottom: 40,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#191970',
  },
  activeToggleText: {
    color: '#fff',
    fontWeight: '600',
  },
  toggleText: {
    color: '#191970',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#757575',
    marginBottom: 30,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },
  primaryBtn: {
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
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
    marginBottom: 15,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkBtn: {
    marginTop: 10,
    padding: 10,
  },
  linkText: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  }
});

export default SignUp;