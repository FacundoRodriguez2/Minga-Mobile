import { createReducer } from "@reduxjs/toolkit";
import mangasActions from "./actions";

const { read_myMangas } = mangasActions

const initialState = {
    myMangas: []
}

const reducer = createReducer(
    initialState,
    (builder) => { builder
        .addCase(
            read_myMangas.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    myMangas: action.payload.myMangas
                }
                return newState
            }
        )  
    }
)

export default reducer