import React from 'react';
import { DrawerActions } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Savings from '../components/Savings';

const SavingsAccount = ({ navigation }) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>

      
      <TouchableOpacity 
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
        style={styles.drawerButton}
      >
        <MaterialCommunityIcons name="menu" size={30} color="#191970" />
      </TouchableOpacity>

     
      <Text style={styles.title}>Products</Text>

      <Savings
        name="Savings Account"
        description="Manage your money by saving for future purchases or investments..."
        image={require('../../assets/images/img1.webp')}
      />

      <Savings
        name="Save your Change"
        description="Save effortlessly with every purchase you make."
        image={require('../../assets/images/img2.png')}
      />

      <Savings
        name="Point of Savings"
        description="Plan your future by creating savings goals and achieve them with ease!"
        image={require('../../assets/images/img3.avif')}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: 'center',
  },

 
  drawerButton: {
    alignSelf: 'flex-start',
    marginTop: 40, 
    marginBottom: 20,
  },

  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
  },
});

export default SavingsAccount;
