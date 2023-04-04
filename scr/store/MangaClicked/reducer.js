import { createReducer } from "@reduxjs/toolkit";
import mangaClickActions from './actions'

const { mangaClicked } = mangaClickActions

const initialState = {
    state: false,
}

const mangaClickReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            mangaClicked,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default mangaClickReducer