import React from 'react'
import { View, Text, StyleSheet ,TouchableOpacity ,Image } from 'react-native'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import chapterActions from '../store/chapters/actions'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'
import IconComent from '../../images/iconcomment.png'
import chapterClickActions from '../store/ChapterClicked/actions'
import { useNavigation } from '@react-navigation/native';

const { get_chapters } = chapterActions
const { chapterClicked } = chapterClickActions

function ChapterRead() {
    const route = useRoute();
    const mangaId = route.params.mangaId;
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    let [token, setToken] = useState('')
    let chapters = useSelector(store => store.chapters.chapters)
    let [checkManga, setCheckManga] = useState(true)
    let [checkChapter, setCheckChapter] = useState(false)

    function handleMangaCheck() {
        setCheckManga(true)
        setCheckChapter(false)
    }

    function handleChapterCheck() {
        setCheckChapter(true)
        setCheckManga(false)
    }

    let manga = useSelector(store => store.chapters.manga)

    useFocusEffect(React.useCallback(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
                getChapters(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [mangaId]));

    function getChapters(token) {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        dispatch(get_chapters({ manga_id: mangaId, page: page, headers: headers }))
    }

    useEffect(() => {
        if (token) {
            getChapters(token)
        }
    }, [page])

    const navigation = useNavigation()
    function handleRead(e,id){
        dispatch(chapterClicked({state: true}))
        setTimeout( () => {
            navigation.navigate('Chapter',{chapterId: id, mangaId: mangaId});
        }, 100)
    }

    return (
        <>
            <View style={styles.detailsBtns}>
                <TouchableOpacity style={[styles.mangaBtn, checkManga ? styles.checked : '']} onPress={handleMangaCheck}>
                    <Text style={checkManga ? styles.checkedText : styles.btnText}>Manga</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.mangaBtn, checkChapter ? styles.checked : '']} onPress={handleChapterCheck}>
                    <Text style={checkChapter ? styles.checkedText : styles.btnText}>Chapters</Text>
                </TouchableOpacity>
            </View>
            {
                checkManga ? <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 15 }}>
                    <Text style={{ textAlign: 'center', width: '90%', height: 200 }}>{description}</Text>
                </View> : <></>
            }
            {
                checkChapter ? 
                <View style={{paddingBottom: 25}}>
                    {
                        chapters?.length > 0
                            ?
                            chapters.map((chapter, i) => {
                                return (
                                    <View style={styles.sectionChapter} key={i}>
                                        <Image style={styles.selecChapter} source={{ uri: chapter.cover_photo }} alt={chapter.title} />
                                        <View style={styles.orderChapter}>
                                            <Text>Chapter #{chapter.order}</Text>
                                            <View style={styles.comentChapter}>
                                                <Image style={styles.comentChapterImg} source={IconComent} alt="icono-coment" />
                                                <Text>169</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.btnRead} onPress={(event) => handleRead(event, chapter._id)}><Text style={styles.btnReadText}>Read</Text></TouchableOpacity>
                                    </View>
                                )
                            })
                            :
                            <Text>No Chapter founded</Text>
                    }
                    <View style={styles.divChapter}>
                        { page===1 ? <></> : <TouchableOpacity style={styles.btnChapter} onPress={() => { setPage(page - 1) }}>
                            <Text style={styles.btnReadText}>Prev</Text>
                        </TouchableOpacity> }
                        { chapters.length === 4 ? <TouchableOpacity style={styles.btnChapter} onPress={() => { setPage(page + 1) }}>
                            <Text style={styles.btnReadText}>Next</Text>
                        </TouchableOpacity> : <></> }
                    </View>

                </View> : <></>
            }
        </>
    )
}

const styles = StyleSheet.create({
    detailsBtns: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 35
    },
    mangaBtn: {
        width: 80,
        height: 30,
        backgroundColor: '#EBEBEB',
        borderRadius: 40,
        borderWidth: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 17,
    },
    btnText: {
        color: '#9D9D9D'
    },
    checked: {
        backgroundColor: '#F9A8D4',
    },
    checkedText: {
        color: '#FFFFFF',
    },
    sectionChapter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 45
    },
    selecChapter: {
        width: 100,
        height: 120,
        borderRadius: 8,
    },
    orderChapter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        fontSize: 24,
        textAlign: 'center',
    },
    comentChapter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    comentChapterImg: {
        width: 20,
        height: 20,
    },
    btnRead: {
        width: 70,
        height: 50,
        backgroundColor: '#F9A8D4',
        borderRadius: 6,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnReadText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    divChapter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
    },
    btnChapter: {
        width: 70,
        height: 30,
        backgroundColor: '#F9A8D4',
        borderRadius: 40,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default ChapterRead