import { createAction } from "@reduxjs/toolkit"

let open = createAction(
    'open',
    ({ icon,text })=> { return { payload: { icon, text, visible: true } }}
)

let close = createAction(
    'close',
    ({ icon,text })=> { return { payload: { icon, text, visible: false } }}
)

const alertActions = { open,close }

export default alertActions