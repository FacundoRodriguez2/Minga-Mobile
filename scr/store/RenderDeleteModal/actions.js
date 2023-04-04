import { createAction } from "@reduxjs/toolkit";

let renderDeleteModal = createAction(
    'renderDeleteModal',
    ({state, id}) => {
        return {
            payload: {
                state: state,
                id: id
            }
        }
    }
)

const modalActions = {renderDeleteModal}
export default modalActions