import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import axios from 'axios'
import GoBackHome from './GoBackHome';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function RegisterForm({setRender}) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUp() {
        let data = {
            name: name,
            mail: email,
            photo: photo,
            password: password
        }
        console.log(data);
        let url = 'https://back-minga.onrender.com/api/auth/signup'
        try {
            await axios.post(url, data)
            setLoading(false)
            alert('Register Successful, please checkout your email and verify your account');
            console.log('Register Successful')
            setTimeout(() => navigation.navigate('Login'), 4000)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <ScrollView style={styles.register}>
        <View style={styles.registerContent}>
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeSectionH2}>Welcome!</Text>
                <Text style={styles.welcomeSectionP}>Discover manga, manhua and manhwa, track your progress, have fun, read manga.</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.fieldset}>
                    <Text style={styles.legend}>Name</Text>
                    <TextInput name="name" id="name" style={styles.input} onChangeText={inputText => setName(inputText)} />
                </View>
                <View style={styles.fieldset}>
                    <Text style={styles.legend}>Email</Text>
                    <TextInput name="mail" id="mail" style={styles.input} onChangeText={inputText => setEmail(inputText)} />
                </View>
                <View style={styles.fieldset}>
                    <Text style={styles.legend}>Photo</Text>
                    <TextInput name="photo" id="photo" style={styles.input} onChangeText={inputText => setPhoto(inputText)} />
                </View>
                <View style={styles.fieldset} id='field-password'>
                    <Text style={styles.legend}>Password</Text>
                    <TextInput secureTextEntry={true} name="password" id="password" style={styles.input} onChangeText={inputText => setPassword(inputText)} />
                </View>
                {/* DAR FUNCIONALIDAD PARA EL SIGN UP */}
                <TouchableOpacity style={styles.sign} onPress={handleSignUp}><Text style={styles.signText} >Sign up</Text ></TouchableOpacity>
                {/* <GoogleLogin
                    className="google"
                    image="./google.png"
                    text="Sign in with Google"
                    clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"sigle_host_policy"}
                /> */}
                <Text style={styles.loginText}>Already have an account? <Text style={styles.link} onPress={() => {setRender('login')}}>Log in</Text></Text>
                <GoBackHome/>
            </View>
        </View>
        <Spinner visible={loading} />
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    register: {
        width: windowWidth,
        height: windowHeight,
        paddingTop: '10%'
    },
    registerContent: {
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
        width: '100%'
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


export default RegisterForm