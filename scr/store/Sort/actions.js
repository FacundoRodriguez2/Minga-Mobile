import { createAction } from "@reduxjs/toolkit";

let captureSort = createAction(
    'captureSort',
    ({ order }) => {
        return {
            payload: {
                order: order
            }
        }
    }
)

const sortActions = { captureSort }
export default sortActions