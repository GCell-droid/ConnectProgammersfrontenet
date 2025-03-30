const { createSlice } = require("@reduxjs/toolkit");

const Request = createSlice({
    name: "Request",
    initialState: null,
    reducers: {
        fillRequestInbox: (state, action) => {
            return action.payload
        },
        removeRequestInbox: () => null
    }
})
export const { fillRequestInbox, removeRequestInbox } = Request.actions
export default Request.reducer