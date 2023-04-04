import React from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import bottomTabsActions from '../store/ReloadBottomTabs/actions';
import mangaClickActions from '../store/MangaClicked/actions';
import chapterClickActions from '../store/ChapterClicked/actions';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import bg from '../../images/background.png'
import { ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store/store.js'
const { reloadBottomTabs } = bottomTabsActions
const { mangaClicked } = mangaClickActions
const { chapterClicked } = chapterClickActions

function Logout() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  let state = useSelector(store => store)
  let dispatch = useDispatch()

  useEffect(() => {
    async function handleLogout() {
      setLoading(true)
      try {
        const token = await AsyncStorage.getItem('token');
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let url = 'https://back-minga.onrender.com/api/auth/signout'
        await axios.post(url, "", headers)
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('user')
        console.log('Logout')
        dispatch(reloadBottomTabs({ state: !state }))
        dispatch(mangaClicked({ state: false }))
        dispatch(chapterClicked({ state: false }))
        setLoading(false)
        setTimeout(() => navigation.navigate('Home'), 1000)
      } catch (error) {
        console.log(error);
      }
    }
    handleLogout();
  }, []);

  return (
    <Provider store={store}>
    <ImageBackground style={styles.logout} source={bg}>
      <View style={styles.mangaBtn}>
        <Text style={styles.btnText}>You are beeing logged out</Text>
        <Text style={styles.btnText}>Please wait</Text>
      </View>
      <Spinner visible={loading} />
    </ImageBackground>
    </Provider>
  )
}

const styles = StyleSheet.create({
  logout: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mangaBtn: {
        width: 300,
        height: 100,
        backgroundColor: '#F9A8D4',
        borderRadius: 6,
        borderWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        elevation: 5,
        gap: 10,
    },
    btnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 17,
    },
})

export default Logout
