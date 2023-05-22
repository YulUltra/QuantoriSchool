import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchStringStateSlice = createSlice({
    name: "searchString",
    initialState: "",
    reducers: {
        setSearchString(state, action: PayloadAction<string>) {
            state = action.payload;
        },
        clearSearchString(state) {
            state = "";
        },
    },
});

export const { setSearchString, clearSearchString } = searchStringStateSlice.actions;
export default searchStringStateSlice.reducer;
