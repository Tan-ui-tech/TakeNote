import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import { StackActions } from '@react-navigation/native';
import { router } from 'expo-router';
import { setIP } from './ipconfig';
import { stylez } from './styles';
import AuthInputField from '@/components/Auth/AuthInputField';
//lottiefiles (animation from chrome)
import LoadingOverlay from '@/components/LoadingScreen';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    // Display an overlay to prevent the user from logging in multiple times
    setLoading(true);

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

      // Disable the loading overlay
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Login successful');
        // Store the token

        // console.log(data.token);
        await AsyncStorage.setItem('userToken', data.token);

        router.replace('/home');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);

      // Disable the loading overlay
      setLoading(false);
    }
  };

  // function redirectToHome() {
  //   console.log("Logging in ")
  //   router.replace('/home')
  // }

  useEffect(() => {
    console.log(`[Login.tsx] : Username: ${username}, Password: ${password}`);
  }, [username, password]);

  return (
    <View style={stylez.container}>
      <Text style={stylez.title}>Login</Text>

      <LoadingOverlay message="Loading..." visible={loading} />

      <AuthInputField type="username" inputOnChange={setUsername} />
      <AuthInputField type="password" inputOnChange={setPassword} />

      <TouchableOpacity style={stylez.button} onPress={handleLogin}>
        <Text style={stylez.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/register')}>
        <Text style={stylez.link}>No Account?</Text>
      </TouchableOpacity>
    </View>
  );
}
