import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Index from '../screens/Index'
import AuthForm from "../screens/AuthForm";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Logout from "../screens/Logout";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import Mangas from '../screens/Mangas';
import MangaDetails from '../screens/MangaDetails';
import Chapter from '../screens/Chapter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator()

function BottomTabsNavigation() {
    let [token, setToken] = useState('')

    let state = useSelector(store => store.bottomTabsReducer.state)
    let mangaClicked = useSelector(store => store.mangaClickReducer.state)
    let chapterClicked = useSelector(store => store.chapterClickReducer.state)

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
    }, [state, mangaClicked, chapterClicked]));

    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
            }} component={Index} initialParams={{ state: 'register' }} />
            {token ? <></>
                :
                <>
                    <Tab.Screen name='Register' options={{
                        headerShown: false, tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="user-circle" color={color} size={size} />
                        ),
                    }} component={AuthForm} initialParams={{ state: 'register' }} />
                    <Tab.Screen name='Login' options={{
                        headerShown: false, tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="user-circle" color={color} size={size} />
                        ),
                    }} component={AuthForm} initialParams={{ state: 'login' }} />
                </>
            }
            {token ? <Tab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" color={color} size={size} />
                ),
            }} name='Mangas' component={Mangas} /> : <></>}
            {token && mangaClicked ? <Tab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" color={color} size={size} />
                ),
            }} name='Details' component={MangaDetails} /> : <></>}
            {token && chapterClicked ? <Tab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" color={color} size={size} />
                ),
            }} name='Chapter' component={Chapter} /> : <></>}
            {token ? <Tab.Screen options={{
                headerShown: false, tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="user-circle" color={color} size={size} />
                ),
            }} name='Logout' component={Logout} /> : <></>}
        </Tab.Navigator>
    )
}

export default BottomTabsNavigation