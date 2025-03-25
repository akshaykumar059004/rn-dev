import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from '@env';
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  // Fetch users whenever screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name} - {item.email}</Text>}
      />
      <Button title="Add User" onPress={() => navigation.navigate("Add User")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
