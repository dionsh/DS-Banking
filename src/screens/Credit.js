import { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import CreditComponent from "../components/CreditComponent";
import InfoAccordion from "../components/InfoAccordion";


const midnightBlue = "#191970";
const mistGray = "#ECEFF1";

export default function Credit() {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const flatRef = useRef();

  const [index, setIndex] = useState(0);
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(24);

  const cards = [
    {
      title: "Fast credit approval",
      text: "Apply in minutes and receive an answer quickly. Simple forms, instant processing."
    },
    {
      title: "Apply completely online",
      text: "Apply online and choose the nearest DS Banking spot to finalise the process."
    },
    {
      title: "Transparent interest",
      text: "What you see is what you pay. No hidden fees, no surprises — just honest terms."
    }
  ];

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % cards.length;
      flatRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
      setIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  // Kalkulimi i kreditit
  const interest = 0.06;
  const monthlyRate = interest / 12;

  const monthlyPayment =
    (amount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -months));

  return (
    <ScrollView style={styles.container}>

     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={26} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Apply for Credit</Text>
      </View>

     
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/images/dsbanklogotr.png")}
          style={styles.logo}
        />
        <Text style={styles.logoText}>DS Banking</Text>
      </View>

    
      <FlatList
        ref={flatRef}
        data={cards}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ width: width, paddingHorizontal: 16 }}>
            <CreditComponent title={item.title} text={item.text} />
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndex(newIndex);
        }}
      />

      <View style={styles.dots}>
        {cards.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              index === i && styles.activeDot
            ]}
          />
        ))}
      </View>


      <Text style={styles.sectionTitle}>Calculate your Credit</Text>

      <View style={styles.calcCard}>
        <Text style={styles.label}>Amount: €{Math.round(amount)}</Text>

        <Slider
          minimumValue={1000}
          maximumValue={50000}
          step={500}
          value={amount}
          onValueChange={setAmount}
          minimumTrackTintColor={midnightBlue}
          maximumTrackTintColor="#ccc"
        />

        <Text style={styles.label}>
          Repayment period: {months} months
        </Text>

        <Slider
          minimumValue={6}
          maximumValue={72}
          step={6}
          value={months}
          onValueChange={setMonths}
          minimumTrackTintColor={midnightBlue}
          maximumTrackTintColor="#ccc"
        />

        <View style={styles.resultBox}>
  <Text style={styles.resultText}>Monthly Payment</Text>
  <Text style={styles.resultAmount}>
    €{monthlyPayment.toFixed(2)}
  </Text>
</View>

<TouchableOpacity style={styles.applyButton}>
  <Text style={styles.applyText}>Apply</Text>
</TouchableOpacity>

         
      </View>

  
<Text style={styles.sectionTitle}>
  What you need to know before applying ?
</Text>

<View style={styles.infoCard}>
  <InfoAccordion
    title="Basic requirements"
    text="You must be over 18, have a stable income and valid identification."
  />

  <InfoAccordion
    title="Valid ID or Passport"
    text="A valid identification document issued by the Republic of Kosovo is required."
  />

  <InfoAccordion
    title="Bank account statement"
    text="Recent bank statements may be required to verify your income."
  />

  <InfoAccordion
    title="Contact number"
    text="We may contact you to confirm your application details."
  />


   <InfoAccordion
    title="Current account at DS Banking"
    text="In case you don't have an account at DS Banking, one will be opened when applying for credit."
  />

  <InfoAccordion
    title="Repayment information"
    text="Make sure you understand your repayment schedule and monthly obligations."
  />
</View>


      <View style={{ height: 60 }} />
    </ScrollView>
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
    backgroundColor: midnightBlue,
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 16,
  },

  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },

  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: midnightBlue,
  },

 dots: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 6,
  marginBottom: 12,
},

dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#bbb",
  marginHorizontal: 4,
},

activeDot: {
  backgroundColor: midnightBlue,
  width: 18,
},

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 32, 
    color: midnightBlue,
  },

  calcCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 14,
    elevation: 3,
  },

  label: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "600",
  },

  resultBox: {
    marginTop: 18,
    backgroundColor: mistGray,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  resultText: {
    color: "#555",
  },

  resultAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: midnightBlue,
    marginTop: 4,
  },

  applyButton: {
  backgroundColor: midnightBlue,
  alignSelf: "flex-end",
  paddingVertical: 10,
  paddingHorizontal: 26,
  borderRadius: 10,
  marginTop: 14,
},

applyText: {
  color: "white",
  fontWeight: "600",
  fontSize: 15,
},

infoCard: {
  backgroundColor: "white",
  marginHorizontal: 16,
  paddingHorizontal: 18,
  paddingVertical: 8,
  borderRadius: 14,
  elevation: 2,
  marginBottom: 30,
},

});
