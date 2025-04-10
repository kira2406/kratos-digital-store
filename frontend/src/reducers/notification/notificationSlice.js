import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: [],
    reducers: {
        addNotification: (state, action) => {
            state.push(action.payload)
        },
        removeNotification: (state, action) => {
            const notificationId = action.payload
            return state.filter((notification) => notification.id !== notificationId)
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;