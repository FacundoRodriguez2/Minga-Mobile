import { createReducer } from "@reduxjs/toolkit";
import textActions from './actions'

const { captureText } = textActions

const initialState = {
    text: ""
}

const textReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            captureText,
            (state, action) => {
                let newState = {
                    ...state,
                    text: action.payload.text.trim()
                }
                return newState
            }
        )
)

export default textReducer