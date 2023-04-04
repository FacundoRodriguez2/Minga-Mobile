import { createReducer } from "@reduxjs/toolkit";
import bottomTabsActions from './actions'

const { reloadBottomTabs } = bottomTabsActions

const initialState = {
    state: false,
}

const bottomTabsReducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            reloadBottomTabs,
            (state, action) => {
                let newState = {
                    ...state,
                    state: action.payload.state,
                }
                return newState
            }
        )
)

export default bottomTabsReducer