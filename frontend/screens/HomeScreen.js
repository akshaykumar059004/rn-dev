import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.227.1:5000/api/users");
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
        keyExtractor={(item) => item._id}
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
