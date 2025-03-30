import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnections: (state, action) => { return action.payload },
        removeConnections: () => null,
    }
})
export const { addConnections, removeConnections } = connections.actions;
export default connections.reducer;