import { createReducer } from "@reduxjs/toolkit";
import categoriesActions from './actions'

const { captureCheck } = categoriesActions

const initialState = {
    categories: ""
}

const categoriesReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            captureCheck,
            (state, action) => {
                let newState = {
                    ...state,
                    categories: action.payload.categories.split(',')
                }
                return newState
            }
        )
)

export default categoriesReducer