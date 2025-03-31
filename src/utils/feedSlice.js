import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        handleFeed: (state, action) => {
            const newFeed = state.filter((user) => user._id != action.payload)
            return newFeed
        },
        removeFeed: () => null
    }
})
export const { addFeed, removeFeed, handleFeed } = feedSlice.actions;
export default feedSlice.reducer