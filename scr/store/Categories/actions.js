import { createAction } from "@reduxjs/toolkit";

let captureCheck = createAction(
    'captureCheck',
    ({ categories }) => {
        return {
            payload: {
                categories: categories
            }
        }
    }
)

const categoriesActions = { captureCheck }
export default categoriesActions