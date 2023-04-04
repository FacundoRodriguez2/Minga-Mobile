import { createReducer } from "@reduxjs/toolkit";
import commentsActions from './actions'

const { getComments } = commentsActions

const initialState = {
    comments: [],
}

const commentsReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            getComments,
            (state, action) => {
                let newState = {
                    ...state,
                    comments: action.payload.comments,
                }
                return newState
            }
        )
)

export default commentsReducer