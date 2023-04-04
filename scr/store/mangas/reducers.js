import mangaActions from "./actions"
import { createReducer } from "@reduxjs/toolkit"

const {

    get_mangas_from_author,
    get_manga,
    read_mangas

} = mangaActions

const initialState = {
    manga: [],
    mangas: [],
    mangaById: [],
    storedMangas: "",
    message: "",
    limit: 10,
    order: "desc",
    search: "",
    title:"",
    description:"",
    category:"",
    cover_photo:"",
    
}

const mangaReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(get_mangas_from_author.fulfilled, (state, action) => {
            let newState = {
                ...state,
                mangas: action.payload.response.mangas,
                message: action.payload.message,
            }
            return newState
        })
        .addCase(get_mangas_from_author.rejected, (state, action) => {
            let newState =  {
                message: "error"
            }
            return newState
        })
        .addCase(get_manga.fulfilled, (state, action) => {
            console.log(action.payload.response.manga)
            let newState = {
                ...state,
                title: action.payload.response.manga.title,
                description:action.payload.response.manga.description,
                cover_photo:action.payload.response.manga.cover_photo,
                category:action.payload.category,
                company:action.payload.company
                
            }
            return newState
        })
        .addCase(get_manga.rejected, (state, action) => {
            let newState =  {
                message: "error"
            }
            return newState
        })
        .addCase(read_mangas.fulfilled,(state, action) => {
                let newState = {
                    ...state,
                    mangas: action.payload.mangas
                }
                return newState
            }
        )
})





export default mangaReducer
