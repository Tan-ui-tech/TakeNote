import { Link, Redirect, router } from 'expo-router';
import { useEffect } from 'react';
import { Button, Pressable, Text, View } from 'react-native';

export default function Page() {

    // useEffect(() => {
    //     console.log(`${process.env.API_URL}`)
    // }, [])

    return (
        <Redirect href="/login" />
    );
}
