import { createReducer } from "@reduxjs/toolkit";
import sortActions from './actions'

const { captureSort } = sortActions

const initialState = {
    order: 1
}

const sortReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            captureSort,
            (state, action) => {
                let newState = {
                    ...state,
                    order: action.payload.order
                }
                return newState
            }
        )
)

export default sortReducer