import React from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, ImageBackground,TouchableOpacity } from "react-native";
import bg from '../../images/hero-background.png'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Hero() {
    let [token, setToken] = useState('')

    useFocusEffect(React.useCallback(() => {
        async function getToken() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getToken();
    }, []));

    const navigation = useNavigation()
    function navigateMangas(){
        if(token){
            navigation.navigate('Mangas');
        }else{
            navigation.navigate('Register');
        }
    }
    return (
        <View style={styles.hero}>
        <ImageBackground
            source={bg}
            style={styles.backgroundHeroImage}
        >
            <View style={styles.exploreSection}>
                <Text style={styles.exploreTitle}>Live the emotion of the manga</Text>
                <Text style={{color: '#FFF'}}>Find the perfect manga for you</Text>
                <TouchableOpacity onPress={navigateMangas} style={styles.exploreBtn}><Text style={styles.textBtn}>Explore</Text></TouchableOpacity>
            </View> 
        </ImageBackground>
    </View>
    )
}

const styles = StyleSheet.create({
    hero:{
        width: windowWidth,
        height: windowHeight,
    },
    backgroundHeroImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exploreSection: {
        width: 300,
        height: 204,
        gap: 25,
        margin: 0,
        alignItems: 'center',  
    },
    exploreTitle: {
        fontWeight: 'bold',
        fontSize: 35,
        textShadowColor: 'rgba(255, 255, 255, 0.25)',
        textShadowOffset: {width: 1, height: 8},
        textShadowRadius: 50,
        color: '#FFF',
        textAlign: 'center'
    },
    exploreBtn: {
        width: 240,
        height: 55,
        backgroundColor: '#F9A8D4',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 24,
        textDecorationLine: 'none',
    }
});

export default Hero