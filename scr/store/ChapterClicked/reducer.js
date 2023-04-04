import { createReducer } from "@reduxjs/toolkit";
import chapterClickActions from './actions'

const { chapterClicked } = chapterClickActions

const initialState = {
    state: false,
}

const chapterClickReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            chapterClicked,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default chapterClickReducer