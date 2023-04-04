import { createAction } from "@reduxjs/toolkit";

let captureText = createAction(
    'captureText',
    ({ inputText }) => {
        return {
            payload: {
                text: inputText
            }
        }
    }
)

const textActions = { captureText }
export default textActions