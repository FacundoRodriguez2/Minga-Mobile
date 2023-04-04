import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"



const handleToken = () => {
    const BEARER_TOKEN = localStorage.getItem("token")

    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }
    return config
}

const get_mangas_from_author = createAsyncThunk(
    "get_mangas_from_author",
    async ({ author_id }) => {
        try {
            let response = await axios.get(
                `https://back-minga.onrender.com/api/mangas/authors/${author_id}?new=${true}`,
                handleToken()
            )
            return {
                response: { mangas: response.data.response },
                message: "Manga/s Found",
            }
        } catch (error) {
            console.log(error)
            return {
                response: { mangas: error.response.data },
                message: "Manga not found",
            }
        }
    }
)

const get_manga = createAsyncThunk("get_manga", async ({_id}) => {
    try {
        let response = await axios.get(
            `https://back-minga.onrender.com/api/mangas/${_id}`,
            handleToken()
        )
        //console.log(response.data.response)
        return {
            response: { manga: response.data.response },
            category: response.data.response.category_id.name,
            company:response.data.response.company_id.name,
            message: "manga obtained"
        } 
    } catch (error) {
        return {
            response: { manga: error.response.data },
            message: "error obtained manga",
        }
    }
})
const read_mangas = createAsyncThunk(
    'read_mangas',
    async ({ page, inputText, categories, order, headers }) => {
        try{
            let response = await axios.get("https://back-minga.onrender.com/api/mangas/?page="+page+"&title="+inputText.trim()+"&category="+categories+"&order="+order,headers)
            console.log(response.data.mangas)
            return { mangas: response.data.mangas }
        }catch(error){
            return { mangas: '' }
        }
    }
) 


const mangaActions = {
    get_mangas_from_author, read_mangas,get_manga
}

export default mangaActions
