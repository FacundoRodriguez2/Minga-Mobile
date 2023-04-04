import { createAction } from "@reduxjs/toolkit";

let chapterClicked = createAction(
    'chapterClicked',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const chapterClickActions = {chapterClicked}
export default chapterClickActions