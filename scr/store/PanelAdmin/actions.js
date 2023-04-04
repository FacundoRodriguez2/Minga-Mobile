import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let captureState = createAction(
    'captureState',
    ({ buttonState }) => {
        return {
            payload: {
                checked: buttonState,
            }
        }
    }
)

let read_all_authors = createAsyncThunk(
    'read_all_authors',
    async () => {
        try {
            let response = await axios.get('https://back-minga.onrender.com/api/authors/admin/prueba')
            return {
                activeAuthors: response.data.authorActive,
                inactiveAuthors: response.data.authorInactive,
            }
        } catch (error) {
            return { activeAuthors: [], inactiveAuthors: [] }
        }
    }
)
let read_all_company = createAsyncThunk(
    'read_all_company',
    async () => {
        try {
            let response = await axios.get('https://back-minga.onrender.com/api/companies/admin')
            return {
                activeCompanies: response.data.companyActive,
                inactiveCompanies: response.data.companyInactive
            }
        } catch (error) {
            return { activeCompanies: [], inactiveCompanies: [] }
        }
    }
)

let update_author_active = createAsyncThunk(
    'update_author_active ',
    async ({ _id, active}) => {
        try {
            let response = await axios.put(`https://back-minga.onrender.com/api/authors/admin/prueba/${_id}`, { active: active })
            return {
                author: response.data.author,
                success: true,
            }
        } catch (error) {
            return { success: false }
        }
    }
)
let update_company_active = createAsyncThunk(
    'update_company_active ',
    async ({ _id, active , headers}) => {
        try {
            let response = await axios.put(`https://back-minga.onrender.com/api/companies/admin/${_id}`, { active: active })
            return {
                company: response.data.company,
                success: true,
            }
        } catch (error) {
            return { success: false }
        }
    }
)

const actions = { captureState, read_all_authors, read_all_company, update_author_active, update_company_active }
export default actions