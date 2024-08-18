import { useState } from "react";
import { View, TextInput, Button, TouchableOpacity, Text, Alert } from 'react-native';




export default function RegisterScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSign = async () => {
        {
            if (username === username && password === password) {
                Alert.alert('Err', 'Sorry username already exists')
                return;
            }

            try {
                const response = await fetch('http://192.168.1.27:3333/user/register', {
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
                    Alert.alert('Success', 'Registered successfully');
                    console.log(data);
                } else {
                    Alert.alert('Error', data.message || 'Registration failed');
                    console.log(data);
                }

            } catch (error) {
                Alert.alert('Err', 'An unexpected error occurred');
            }

        }
    };


// return(

// )

}