import React from 'react'
import { Text, View, Image, Button } from 'react-native'
import { StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import categoriesActions from '../store/Categories/actions'
import sortActions from '../store/Sort/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import sort from '../../images/sort.png'
import { TouchableOpacity } from 'react-native'

let categoriesCheck = []
let order = 1

function MangasType() {
    const [categories, setCategories] = useState(false)
    const { captureCheck } = categoriesActions
    const dispatch = useDispatch()

    let checkedCategories = useSelector(store => store.categories.categories)

    let categoriesUrl = "https://back-minga.onrender.com/api/categories"
    useEffect(() => {
        axios.get(categoriesUrl).then(e => setCategories(e.data.categories))
    }, [])

    function handleCheck(e, categoryName) {
        categories.forEach(category => {
            if (category.name === categoryName) {
                if (!categoriesCheck.includes(category._id)) {
                    categoriesCheck.push(category._id)
                } else {
                    categoriesCheck = categoriesCheck.filter(e => e !== category._id)
                }
                setTimeout( () => {
                    dispatch(captureCheck({ categories: categoriesCheck.join() }))
                }, 500)
            }
        })
    }

    const { captureSort } = sortActions

    function handleSort() {
        if (order === 1) {
            order = -1
        } else if (order == -1) {
            order = 1
        }
        dispatch(captureSort({ order }))
    }

    return (
        <View style={styles.mangasType}>
            {
                categories ? categories.map((category, i) => {
                    let checkclass = checkedCategories.includes(category._id) ? "checked" : ""
                    return <TouchableOpacity style={[styles[`category-${category.name}`], checkclass && styles.checked]} key={i} onPress={(event) => handleCheck(event, category.name)} categoryName={category.name} >
                        <Text style={[styles[`text-${category.name}`]]}>{category.name}</Text>
                    </TouchableOpacity>
                }) : ""
            }
            <TouchableOpacity onPress={handleSort}>
                <Image style={{width: 35, height: 35}} source={sort} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mangasType: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 5,
        gap: 8,
        marginBottom: 20,
    },
    'category-shonen': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#FFE0DF',
    },
    'category-comic': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#E0DBFF',
    },
    'category-shojo': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#D1FBF0',
    },
    'category-seinen': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 35,
        borderRadius: 50,
        fontWeight: '500',
        fontSize: 12,
        backgroundColor: '#FFDFC8',
    },
    'text-shonen': {
        color: '#EF8481',
    },
    'text-comic': {
        color: '#8883F0',
    },
    'text-shojo': {
        color: '#00BA88',
    },
    'text-seinen': {
        color: '#FC9C57',
    },
    checked: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        opacity: 0.5,
        transform: [
            { scale: 1.1 }
        ]
    }
})

export default MangasType