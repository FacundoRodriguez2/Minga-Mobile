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

const get_chapters= createAsyncThunk(
  "get_chapters",
  async({manga_id,page}) =>{
    try{
      const response =await axios.get(`https://back-minga.onrender.com/api/chapters?manga_id=${manga_id}&page=${page}`,
        handleToken()
      )

      console.log("get_chapters response: ",response)
      return{
          chapter: response.data.response,
          message: "Chapter/s Found",
          page:page
      }
    }
    catch (error) {
      console.log(error)
            return {
                response: { chapters: error.response.data},
                message: "Chapter not found",
            }
    }
  }
)
const editChapter = createAsyncThunk("editChapters", async ({data,chapter_id}) => {
  console.log(data)
  try {
      const body = data
      const response = await axios.put(
        `https://back-minga.onrender.com/api/chapters/${chapter_id}`,  body, 
          handleToken()
      )
      console.log(response) 
      return {
          response: { chapter: response.data },
          message: "Edited chapter",
      }
  } catch (error) {
      return {
          response: { chapter: error.response.data },
          message: "Error edited chapter you must be the author to edit",
      }
  }
})

const deleteChapter = createAsyncThunk(
  'deleteChapter',
  async({ chapter_id })=>{
      try{
          let res = await axios.delete(`https://back-minga.onrender.com/api/chapters/${chapter_id} `,
          handleToken())

          return {delete: 'Delete',
          message:"chapter deleted"    
        }  
      }
      catch(error){
          return {chapters: [],
          message:"error on delete chapter"
        }

      }
  }
)


const chapterActions={
  get_chapters,deleteChapter,editChapter
}

export default chapterActions