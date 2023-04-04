import React from 'react'
import { Text, View, ScrollView, StyleSheet } from "react-native";
import Hero from '../components/Hero';
import AuthForm from './AuthForm'
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { Provider } from 'react-redux';
import  store  from '../store/store.js'
function Index() {
    let state = 'register'

    let [token, setToken] = useState('')

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [state]));

    return (
        <Provider store={store}>
        <ScrollView style={{height: '200%'}}>
            <Hero />
            {token ? '' : <AuthForm state={state} />}
        </ScrollView>
        </Provider>
    );
}

export default Index