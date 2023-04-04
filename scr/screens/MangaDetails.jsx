import React from 'react'
import { Text, View, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/mangas/actions.js'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import ChapterRead from '../components/ChapterRead';

const { get_manga,read_mangas } = actions

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MangaDetails() {
    const route = useRoute();
    const mangaId = route.params.mangaId;
    const dispatch = useDispatch()
    let manga = useSelector(store => store)
    let description =useSelector(store => store.description)

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                getManga(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [mangaId]));

    function getManga(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(get_manga({ manga_id: mangaId, headers: headers }))
    }
    return (
        <ScrollView style={{minHeight: windowHeight}}>
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30, paddingTop: 10 }}>
            <Image source={{ uri: manga.cover_photo}} style={styles.imgPartOne} alt={manga.title} />
            <Text style={styles.section1Text}>{manga.title}</Text>
            <View style={styles.section2}>
                <Text style={styles.btnSection2}>{manga.category_id?.name}</Text>
                <Text style={styles.companyName}>{manga.author_id?.name}</Text>
            </View>
            <ChapterRead/>
        </ScrollView>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    imgPartOne: {
        width: '60%',
        height: 300,
        marginBottom: '5%',
        resizeMode: 'cover',
    },
    section1Text: {
        fontWeight: '500',
        fontSize: 24,
        color: '#222222',
        textAlign: 'center',
        width: '60%',
    },
    section2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginTop: '5%',
    },
    btnSection2: {
        backgroundColor: '#FFE0DF',
        color: '#EF8481',
        padding: 12,
        fontWeight: '500',
        fontSize: 16,
        borderRadius: 50,
        borderWidth: 0,
        elevation: 3,
    },
    companyName: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 17,
        color: '#9D9D9D',
        textDecorationLine: 'none',
    }
})

export default MangaDetails