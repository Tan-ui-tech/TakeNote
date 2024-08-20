import React, {useEffect, useState} from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import { StackActions } from '@react-navigation/native';
import { router } from 'expo-router';
import { setIP } from './ipconfig';
import { stylez } from './styles';


//lottiefiles (animation from chrome)


export default function LoginScreen() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
  
    try {
      const response = await fetch(`${setIP}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        // Store the token
        
        // console.log(data.token);
        await AsyncStorage.setItem('userToken', data.token);

        router.replace('/home')
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);
    }
  };
  

  // function redirectToHome() {
  //   console.log("Logging in ")
  //   router.replace('/home')
  // }

  return (
    <View style={stylez.container}>
      <Text style={stylez.title}>Login</Text>

      <TextInput
        style={stylez.input}
        placeholder="Username"
        placeholderTextColor="#7C7C7C"
        onChange={(e) => setUsername(e.nativeEvent.text)}
      />

      <TextInput
        style={stylez.input}
        placeholder="Password"
        placeholderTextColor="#7C7C7C"
        secureTextEntry
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />

      <TouchableOpacity style={stylez.button} onPress={handleLogin}>
        <Text style={stylez.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/register')}>
        <Text style={stylez.link}>No Account?</Text>
      </TouchableOpacity>
    </View>
  );
}