import React from 'react'
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ScrollView,View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import  store  from '../store/store.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AuthForm({ route, state }) {
  let [render, setRender] = useState('register')
  let [token, setToken] = useState('')

  useEffect(() => {
    async function getData() {
      try {
        const value = await AsyncStorage.getItem('token');
        setToken(value)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  useFocusEffect(React.useCallback(() => {
    setRender(route?.params.state)
  }, []));

  useFocusEffect(React.useCallback(() => {
    if (state) {
      setRender(state)
    }
  }, []));

  return (
    <Provider store={store}>
    <>
      {
        token ? <View style={styles.noLogged}><TouchableOpacity style={styles.noLoggedButton}><Text style={styles.noLoggedText}>Already Logged in</Text></TouchableOpacity></View>
          :
          <>
            {render === 'register' ? <RegisterForm setRender={setRender} /> : ''}
            {render === 'login' ? <LoginForm setRender={setRender} /> : ''}
          </>
      }
    </>
    </Provider>
  )
}

const styles = StyleSheet.create({
  noLogged: {
    width: windowWidth,
    height: windowHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  noLoggedButton: {
    width: 300,
    height: 80,
    borderRadius: 50000,
    backgroundColor: '#F9A8D4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLoggedText: {
    fontWeight: '700',
    fontSize: 25,
    color: '#EBEBEB',
    letterSpacing: 0.05,
    textDecorationLine: 'none',
  },
});

export default AuthForm