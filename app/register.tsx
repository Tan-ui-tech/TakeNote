import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { setIP } from './ipconfig';  // Import the configuration
import { stylez } from './styles';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (!username ) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        // if (password.length < 8) {
        //   Alert.alert('Error', 'Password must be at least 8 characters long');
        //   return;
        // }

        try {
            const response = await fetch(`${setIP}/user/register`, {  // Use the imported configuration
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
                Alert.alert('Success', 'Registration successful');
                // Store the token if needed

            //     console.log(data);
            // await AsyncStorage.setItem('userToken', data.token); # no token can be store in register page
                
                router.replace('/login');
            }
            else if (data.message && data.message.includes('already exists')) {
                Alert.alert('Error', 'This account has already been created');
            } else {
                Alert.alert('Error', data.message || 'Registration failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred');
            console.error(error)
        }
    };

    return (
        <View style={stylez.container}>
            <Text style={stylez.title}>Register</Text>

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

            <TextInput
                style={stylez.input}
                placeholder="Confirm Password"
                placeholderTextColor="#7C7C7C"
                secureTextEntry
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
            />

            <TouchableOpacity style={stylez.button} onPress={handleRegister}>
                <Text style={stylez.buttonText}>Submit</Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => router.replace('/login')}>
                <Text style={stylez.link}>Already have an account?</Text>
            </TouchableOpacity>
        </View>
    );
}