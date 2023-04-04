import { createReducer } from "@reduxjs/toolkit";
import modalActions from './actions'

const { renderModal } = modalActions

const initialState = {
    state: false,
    id: ""
}

const modalReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            renderModal,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                    id: action.payload.id
                }
                return newState
            }
        )
)

export default modalReducer