import chapterActions from './actions'
import { createReducer } from "@reduxjs/toolkit"


const{
  get_chapters,
  editChapter,
  deleteChapter
}=chapterActions


const initialState = {
  chapter: [],
  message: ""
}

const chapterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(get_chapters.fulfilled,(state,action)=>{
      console.log(action.payload.chapter)
      let newState = {
        ...state,
        chapter: action.payload.chapter,
        message: action.payload.message
    }
    return newState
    })
    .addCase(
      editChapter.fulfilled,
      (state, action)=>{
          console.log(action.payload)
          let newState={
              ...state,
              chapters: action.payload.chapters
          }
          return newState
      }
  )
  .addCase(
      deleteChapter.fulfilled,
      (state, action)=>{
          let newState = {
              ...state,
              chapters: action.payload.chapters
          }
          return newState
      }
  )
    // .addCase(get_chapters.rejected, (state, action) => {
    //   let newState =  {
    //       message: "error"
    //   }
    //   return newState
    })
export default chapterReducer