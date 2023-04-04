import { createAction } from "@reduxjs/toolkit";

let reloadBottomTabs = createAction(
    'reloadBottomTabs',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const bottomTabsActions = {reloadBottomTabs}
export default bottomTabsActions