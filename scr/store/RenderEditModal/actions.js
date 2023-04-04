import { createAction } from "@reduxjs/toolkit";

let renderModal = createAction(
    'renderModal',
    ({state, id}) => {
        return {
            payload: {
                state: state,
                id: id
            }
        }
    }
)

const modalActions = {renderModal}
export default modalActions