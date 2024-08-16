import React, {useState} from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';


export default function LoginScreen() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async () =>{
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.27:3333/user/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok){
        Alert.alert('Success', 'Login successful');
        console.log(data);


      } else {
        Alert.alert('Error', data.message || 'Login failed');
        console.log(data);
      }
    } catch(error){
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#7C7C7C"
        onChange={(e) => setUsername(e.nativeEvent.text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7C7C7C"
        secureTextEntry
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />

      <Button title="Submit" color="#A1CEDC" onPress={handleLogin} />

      <TouchableOpacity onPress={() => { /* Handle navigation to sign-up */ }}>
        <Text style={styles.link}>No Account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
  },
  link: {
    color: '#A1CEDC',
    marginTop: 16,
    fontSize: 14,
  },
});