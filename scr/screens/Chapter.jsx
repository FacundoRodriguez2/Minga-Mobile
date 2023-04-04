import React from 'react'
import { View, Text, Image,ScrollView,Dimensions,TouchableOpacity,StyleSheet } from 'react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import axios from 'axios';
import comment from '../../images/iconcomment.png'
import flecha from '../../images/flecha-correcta.png'
import flecha_izquierda from '../../images/flecha-izquierda.png'
import { useNavigation } from '@react-navigation/native';
import { Provider } from 'react-redux';
import  store  from '../store/store.js'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Chapter() {
  const route = useRoute();
  const chapterId = route.params.chapterId;
  const mangaId = route.params.mangaId;
  const [chapter, setChapter] = useState({});
  const [page, setPage] = useState(0)

  useFocusEffect(React.useCallback(() => {
    async function getChapter() {
        try {
          await axios.get('https://back-minga.onrender.com/api/chapters/' + chapterId)
          .then((response) => {
            setChapter(response.data.chapter)
          })
        } catch (error) {
            console.log(error);
        }
    }
    getChapter();
}, [chapterId]));

  const navigation = useNavigation()
  let handlePrev = () => {
    if(page === 0){
      setTimeout( () => {
        navigation.navigate('Details',{mangaId: mangaId});
      }, 100)
    }else{
      setPage(page - 1);
    } 
  };

  let handleNext = () => {
    if(page === chapter.pages.length){
      setTimeout( () => {
        navigation.navigate('Details',{mangaId: mangaId});
      }, 100)
    }else{
      setPage(page + 1);
    }
  };

  function handlePage0(){
    setPage(0)
  }

  return (
    <Provider store={store}>
    <ScrollView contentContainerStyle={styles.mover}>
      <View style={styles.divChapter2}>
        <Text style={styles.parrafoChapter2}> Cap N° {chapter.order} - {chapter.title} </Text>
      </View>
      <View>
        <ScrollView contentContainerStyle={styles.contenedorCapitulos}>
          <TouchableOpacity style={styles.boton} onPress={handlePrev}>
            <Image style={styles.flecha} source={flecha_izquierda} />
          </TouchableOpacity>

          <View style={styles.posi}>
            <Image style={styles.mangaa} source={{ uri: chapter?.pages?.[page] }} />
          </View>

          <TouchableOpacity style={styles.boton} onPress={handleNext}>
            <Image style={styles.flecha} source={flecha} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.divChapter3}>
        <View style={styles.chapter3}>
          <Image style={styles.comment} source={comment} />
          <Text>9</Text>
          <Text>Page: {page}/{chapter?.pages?.length}</Text>
          <TouchableOpacity style={styles.Page0Btn} onPress={handlePage0}>
            <Text style={styles.Page0Text}>Go to page 0</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </Provider>
  )
}

const styles = StyleSheet.create({
  mover: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 50,
    marginTop: 50
  },
  divChapter2: {
    backgroundColor: '#F9A8D4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    height: 30,
  },
  parrafoChapter2: {
    color: 'white',
  },
  contenedorCapitulos: {
    height: 400,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boton: {
    width: 50,
    height: 400,
    paddingTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
  },
  posi: {
    height: 400,
    paddingTop: 10,
    width: '70%',
    display: 'flex',
    justifyContent: 'center'
  },
  divChapter3: {
    background: '#dbd9d9',
    height: 70,
  },
  chapter3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    gap: 8,
  },
  parrafoChapter3: {
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
  comment: {
    width: 20,
    height: 20,
  },
  iconoFlecha: {
    fontSize: 20,
    color: '#000',
    position: 'relative',
    top: 5,
    left: 5,
  },
  flecha: {
    width: 20,
    height: 20
  },
  mangaa: {
    height: '100%',
    width: '100%',
  },
  Page0Btn: {
    width: 90,
    height: 30,
    backgroundColor: '#F9A8D4',
    borderRadius: 40,
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    padding: 5,
},
Page0Text: {
    color: '#FFFFFF'
},
});

export default Chapter