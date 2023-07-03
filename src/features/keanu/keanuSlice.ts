import { createSlice } from "@reduxjs/toolkit";

export const keanuSlice = createSlice({
    name: 'keanu',
    initialState: {
        keanuImage: '',
        options: {},
        error: {}
    },
    reducers: {
        getKeanuImageFetch: (state, action) => {
            state.options = action.payload;
        },
        getKeanuImageSuccess: (state, action) => {
            state.keanuImage = action.payload;
        },
        getKeanuImageFailure: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { getKeanuImageFetch, getKeanuImageSuccess, getKeanuImageFailure } = keanuSlice.actions;

export default keanuSlice.reducer;