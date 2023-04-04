import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import mangasActions from '../store/mangas/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import mangaClickActions from '../store/MangaClicked/actions'

const { read_mangas } = mangasActions
const { mangaClicked } = mangaClickActions

function MangasCards() {
    let mangas = useSelector(store => store.mangas.mangas)
    let text = useSelector(store => store.text.text) 
    let [text1,setText1] = useState(useSelector(store => store.text.text))
    let categories = useSelector(store => store.categories.categories)
    let order = useSelector(store => store.order.order)
    let [page,setPage] = useState(1)
    const dispatch = useDispatch()
    let [token,setToken] = useState('')

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
    }, []));
    
    function getMangas(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(read_mangas({ page: page, inputText: text, categories: categories, order: order, headers }))
    }

    const navigation = useNavigation()
    function handleRead(e, id) {
        dispatch(mangaClicked({state: true}))
        setTimeout( () => {
            navigation.navigate('Details',{mangaId: id});
        }, 100)
    }

    useEffect( () => {
        setText1(text)
        getMangas(token)
    }, [page, text, categories, order, token]);

    return (
        <View style={styles.mangasCards}>
            {
                mangas.length ? mangas.map((manga, i) => {
                    let card =
                        <View style={styles.card} key={i}>
                            <View style={styles.cardText}>
                                <View style={[styles[`card-color-${manga.category_id.name}`]]}></View>
                                <View className='text'>
                                    <View style={{ marginBottom: 25 }}>
                                        <Text style={styles.cardTitle}>{manga.title}</Text>
                                        <Text style={[styles[`span-${manga.category_id.name}`]]}>{manga.category_id.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.cardBtn} onPress={(event) => handleRead(event, manga._id)}>
                                        <Text style={styles.btnText}>Read</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Image style={styles.cardImg} source={{ uri: manga.cover_photo }} alt='manga-image' />
                            </View>
                        </View>
                    return card
                }) : <Text>No mangas founded</Text>
            }
            <View style={styles.pageBtns}>
                {
                    page === 1 ? <></> :
                        <TouchableOpacity style={styles.btns} onPress={() => {setPage(page-1)}}>
                            <Text style={styles.btnsText}>Prev</Text>
                        </TouchableOpacity>
                }
                {
                    mangas.length == 6 || mangas.length == 10 ?
                        <TouchableOpacity style={styles.btns} onPress={() => {setPage(page+1)}}>
                            <Text style={styles.btnsText}>Next</Text>
                        </TouchableOpacity> : <></>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mangasCards: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 150,
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000'
    },
    cardText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        gap: 15,
    },
    cardTitle: {
        fontSize: 15,
        color: '#222222',
    },
    'card-color-shonen': {
        height: 145,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: '#EF8481'
    },
    'card-color-comic': {
        height: 145,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: '#8883F0'
    },
    'card-color-shojo': {
        height: 145,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: '#00BA88'
    },
    'card-color-seinen': {
        height: 145,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: '#FC9C57'
    },
    'span-shonen': {
        color: '#EF8481'
    },
    'span-comic': {
        color: '#8883F0'
    },
    'span-shojo': {
        color: '#00BA88'
    },
    'span-seinen': {
        color: '#FC9C57'
    },
    cardBtn: {
        textDecorationLine: 'none',
        backgroundColor: 'rgba(209, 251, 240, 1)',
        width: 92,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    btnText: {
        color: '#00BA88',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 14,
        textTransform: 'uppercase',
    },
    cardImg: {
        width: 125,
        height: 148,
        borderRadius: 10
    },
    pageBtns: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
    },
    btns: {
        width: 80,
        height: 30,
        borderRadius: 50000,
        backgroundColor: '#F9A8D4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnsText: {
        fontWeight: '700',
        fontSize: 14,
        color: '#EBEBEB',
        textDecorationLine: 'none',
    }
})

export default MangasCards