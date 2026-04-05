import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogOut({ navigation }) {

  useEffect(() => {
    const logout = async () => {
      try {
        // hek session e ruajtur t userit
        await AsyncStorage.removeItem("user");

        // e ndryshon navigation qe useri mos me mujt me shku apet ku u kan
        navigation.reset({
          index: 0,
          routes: [{ name: "SignUp" }],
        });

      } catch (err) {
        console.log("Logout error:", err);
      }
    };

    logout();
  }, []);

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Logging out...</Text>
    </View>
  );
}