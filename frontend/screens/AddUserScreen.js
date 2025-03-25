import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL; 


export default function AddUserScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/api/users`, { name, email });
      await axios.post(`${API_URL}/api/users`, { name, email });
      alert("User added!");
      navigation.goBack();
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
});
