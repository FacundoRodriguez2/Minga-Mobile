import { createAction } from "@reduxjs/toolkit";

let mangaClicked = createAction(
    'mangaClicked',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const mangaClickActions = {mangaClicked}
export default mangaClickActions