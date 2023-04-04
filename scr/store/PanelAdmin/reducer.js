import { createReducer } from "@reduxjs/toolkit";
import actions from './actions'
const { captureState, read_all_authors, read_all_company, update_author_active , update_company_active} = actions

const initiateState = {
    checked: false,
    activeAuthors: [],
    inactiveAuthors: [],
    activeCompanies: [],
    inactiveCompanies: [],
}
const reducer = createReducer(
    initiateState,
    (builder) => builder
        .addCase(
            captureState,
            (state, action) => {
                let newState = {
                    ...state,
                    checked: action.payload.checked
                }
                return newState
            }
        )
        .addCase(
            read_all_company.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    activeCompanies: action.payload.activeCompanies,
                    inactiveCompanies: action.payload.inactiveCompanies,
                    
                }
                return newState
            }
            )
            .addCase(
                read_all_authors.fulfilled,
                (state, action) => {
                    let newState = {
                        ...state,
                        activeAuthors: action.payload.activeAuthors,
                        inactiveAuthors: action.payload.inactiveAuthors
                        
                    }
                    return newState
                }
        )
        .addCase(
            update_author_active.fulfilled,
            (state, action) => {
                let newState = {}
                if (action.payload.success) {
                    let _id = action.payload.author._id
                    let active = action.payload.author.active
                    if (active) {
                        newState = {
                            ...state,
                            inactiveAuthors: state.inactiveAuthors.filter(item => item._id !== _id),
                            activeAuthors: [...state.activeAuthors, action.payload.author]
                        }
                    }else{
                        newState = {
                            ...state,
                            activeAuthors: state.activeAuthors.filter(item => item._id !== _id),
                            inactiveAuthors: [...state.inactiveAuthors, action.payload.author]
                        }
                    }
                }
                return newState
            }
            )
            .addCase(
                update_company_active.fulfilled,
                (state, action) => {
                let newState = {}
                if (action.payload.success) {
                    let _id = action.payload.company._id
                    let active = action.payload.company.active
                    if (active) {
                        newState = {
                            ...state,
                            inactiveCompanies: state.inactiveCompanies.filter(item => item._id !== _id),
                            activeCompanies: [...state.activeCompanies, action.payload.company]
                        }
                    }else{
                        newState = {
                            ...state,
                            activeCompanies: state.activeCompanies.filter(item => item._id !== _id),
                            inactiveCompanies: [...state.inactiveCompanies, action.payload.company]
                        }
                    }
                }
                return newState
            }
        )

)

export default reducer