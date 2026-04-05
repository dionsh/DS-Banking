import React from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import OffersComponent from '../components/OffersComponent';


const screenWidth = Dimensions.get("window").width;


const offerData = [
  { name: "VIBE Package", population: 27, color: "#4F46E5", legendFontColor: "#333", legendFontSize: 13 },
  { name: "Students Package", population: 32, color: "#06B6D4", legendFontColor: "#333", legendFontSize: 13 },
  { name: "Invite & Win", population: 25, color: "#10B981", legendFontColor: "#333", legendFontSize: 13 },
  { name: "Premium Package", population: 8, color: "#F59E0B", legendFontColor: "#333", legendFontSize: 13 },
  { name: "Visa Platinum", population: 8, color: "#EF4444", legendFontColor: "#333", legendFontSize: 13 },
];

const MyOffers = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>

   
      <TouchableOpacity 
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
        style={styles.drawerButton}
      >
        <MaterialCommunityIcons name="menu" size={30} color="#191970" />
      </TouchableOpacity>

 
      <Text style={styles.title}>Offers</Text>

    
      <PieChart
        data={offerData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"10"}
        absolute
      />

     
      <OffersComponent
        name="VIBE Package"
        description="Are you 16-27 and need a bank account that is simple, efficient and can be opened 100% online? VIBE Package is dedicated for you."
        image={require('../../assets/images/pakovibe.jpg')}
      />

      <OffersComponent
        name="STUDENTS Package"
        description="DS Banking has thought about this, creating RaiStudent - the student account where all products and services within the account are free."
        image={require('../../assets/images/student.jpg')}
      />

      <OffersComponent
        name="Invite and Win"
        description="Win 10 EUR for every friend or family member you refer to be apart of DS Banking!"
        image={require('../../assets/images/shoket.jpg')}
      />

      <OffersComponent
        name="Premium Package"
        description="As a premium customer of DS Banking, I want to have a package of banking products and services through which I fulfill all my daily banking needs."
        image={require('../../assets/images/premium.avif')}
      />

      <OffersComponent
        name="VISA Platinum"
        description="Traveling abroad is an important part of my life. On the many trips I take for work and pleasure, I want to have better quality services and various benefits along the way."
        image={require('../../assets/images/plat2.jpg')}
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

export default MyOffers;