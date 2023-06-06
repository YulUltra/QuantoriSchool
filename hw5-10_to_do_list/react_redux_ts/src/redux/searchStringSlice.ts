import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchStringStateSlice = createSlice({
    name: "searchString",
    initialState: "",
    reducers: {
        setSearchString(state, action: PayloadAction<string>) {
            return action.payload;
        },
        clearSearchString(state) {
            return "";
        },
    },
});

export const { setSearchString, clearSearchString } = searchStringStateSlice.actions;
export default searchStringStateSlice.reducer;
