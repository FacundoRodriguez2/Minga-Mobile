import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Dimensions } from "react-native";
import axios from 'axios'
import GoBackHome from './GoBackHome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import bottomTabsActions from '../store/ReloadBottomTabs/actions';
import mangaClickActions from '../store/MangaClicked/actions';
import chapterClickActions from '../store/ChapterClicked/actions';
import { TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const { reloadBottomTabs } = bottomTabsActions
const { mangaClicked } = mangaClickActions
const { chapterClicked } = chapterClickActions

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoginForm({ setRender }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    let state = useSelector(store => store.bottomTabsReducer.state)

    let dispatch = useDispatch()

    async function handleSignIn() {
        setLoading(true)

        let data = {
            mail: email,
            password: password
        }
        let url = 'https://back-minga.onrender.com/api/auth/signin'
        let admin
        let author
        try {
            await axios.post(url, data).then(res => {
                res.data.user.is_admin ? (admin = true) : (admin = false)
                res.data.user.is_author ? (author = true) : (author = false)
                AsyncStorage.setItem('token', res.data.token)
                AsyncStorage.setItem('user', JSON.stringify({
                    id: res.data.user._id,
                    name: res.data.user.name,
                    mail: res.data.user.mail,
                    photo: res.data.user.photo,
                    admin,
                    author
                }))
                dispatch(reloadBottomTabs({ state: !state }))
                dispatch(mangaClicked({ state: false }))
                dispatch(chapterClicked({ state: false }))
                setLoading(false)
                setTimeout(() => navigation.navigate('Home'), 1000)
            })
            console.log('Login Successful')
        } catch (error) {
            setLoading(false)
            console.log('ERROR' + error)
        }
    }

    return (
        <ScrollView style={styles.login}>
            <View style={styles.loginContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeSectionH2}>Welcome <Text style={styles.link}>back</Text>!</Text>
                    <Text style={styles.welcomeSectionP}>Discover manga, manhua and manhwa, track your progress, have fun, read manga.</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>Email</Text>
                        <TextInput name="mail" id="mail" style={styles.input} onChangeText={inputText => setEmail(inputText)} />
                    </View>
                    <View style={styles.fieldset} id='field-password'>
                        <Text style={styles.legend}>Password</Text>
                        <TextInput secureTextEntry={true} name="password" id="password" style={styles.input} onChangeText={inputText => setPassword(inputText)} />
                    </View>
                    <TouchableOpacity style={styles.sign} onPress={handleSignIn}><Text style={styles.signText} >Sign In</Text ></TouchableOpacity>
                    <Text style={styles.loginText}>You don´t have an account yet? <Text style={styles.link} onPress={() => { setRender('register') }}>Sign up</Text></Text>
                    <GoBackHome />
                </View>
            </View>
            <Spinner visible={loading} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    login: {
        width: windowWidth,
        height: windowHeight,
        paddingTop: '25%'
    },
    loginContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 25,
        padding: 15,
        gap: 25,
    },
    welcomeSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 11,
        width: '100%',
    },
    welcomeSectionH2: {
        textAlign: 'center',
        width: '100%',
        height: 39,
        fontWeight: '600',
        fontSize: 32,
    },
    welcomeSectionP: {
        textAlign: 'center',
        width: '100%',
        fontWeight: '600',
        fontSize: 12,
        color: '#1f1f1fbf'
    },
    form: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 22
    },
    fieldset: {
        width: '100%',
        height: 48,
        backgroundColor: '#EBEBEB',
        borderWidth: 1,
        borderColor: 'rgba(31, 31, 31, 0.5)',
        borderRadius: 10,
        position: 'relative',
        marginHorizontal: 'auto',
    },
    legend: {
        fontWeight: '400',
        fontSize: 12,
        backgroundColor: 'transparent',
        paddingLeft: 15,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#F9A8D4',
        color: '#EBEBEB',
        fontSize: 12,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        width: '90%',
        marginLeft: 15,
        height: 25
    },
    sign: {
        width: '100%',
        height: 48,
        backgroundColor: '#F9A8D4',
        borderRadius: 10,
        borderWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    signText: {
        color: '#EBEBEB',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.05,
        width: '100%',
        textAlign: 'center',
    },
    loginText: {
        textAlign: 'center'
    },
    link: {
        textDecorationLine: 'none',
        color: 'rgb(245, 118, 184)',
        fontWeight: 'bold'
    }
})

export default LoginForm