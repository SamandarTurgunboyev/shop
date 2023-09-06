import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'categoty',
    initialState: {
        data: []
    },
    reducers: {
        isLoad: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { isLoad } = categorySlice.actions

export default categorySlice.reducer