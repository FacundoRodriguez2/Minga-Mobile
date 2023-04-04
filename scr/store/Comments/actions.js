import { createAction } from "@reduxjs/toolkit";

let getComments = createAction(
    'getComments',
    ({comments}) => {
        return {
            payload: {
                comments: comments,
            }
        }
    }
)

const commentsActions = {getComments}
export default commentsActions