import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

const handleToken = () => {
    const BEARER_TOKEN = localStorage.getItem("token")

    let config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
    }
    return config
}

const get_author = createAsyncThunk("get_author", async ({_id}) => {
    try {
        const response = await axios.get(`https://back-minga.onrender.com/api/authors/${_id}`, handleToken())
        return {
            response: { author: response.data },
            message: "Author found",
        }
    } catch (error) {
        return {
            response: { author: error.response.data },
            message: "Author not found",
        }
    }
})
const get_me = createAsyncThunk("get_me", async () => {
  try {
      const response = await axios.get(`https://back-minga.onrender.com/api/authors/me`, handleToken())
      return {
          response: { author: response.data },
          message: "Author found",
      }
  } catch (error) {
      return {
          response: { author: error.response.data },
          message: "Author not found",
      }
  }
})
const edit_author = createAsyncThunk(
    "edit_author",
    async ({values}) => {
        try{
            let response = await axios.put(`https://back-minga.onrender.com/api/authors/me`, values, handleToken())
            return{
                response: {author: response.data},
                message: "Author updated successfully"
            }
        }catch(error){
            console.log(error)
            return{
                response: {author: error.response.data},
                message: "Author update failed"
            }
        }
    }
)

const delete_author = createAsyncThunk(
    "delete_author",
    async () => {
      try {
        const response = await axios.put(`https://back-minga.onrender.com/api/authors/me`, { active: false }, handleToken());
        return {
          response: { authors: response.data },
          message: "Author deleted successfully"
        };
      } catch (error) {
        return {
          response: { authors: error.response.data },
          message: "Error deleting author"
        };
      }
    }
  );
  



const authorActions = { get_author, edit_author, delete_author, get_me }

export default authorActions
