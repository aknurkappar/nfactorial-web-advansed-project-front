import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    currentUserId: String;
    token: String
}


const initialState: UserState = {
    currentUserId: "",
    token : ""
};


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser : (state, action: PayloadAction<{id : String, token : String}>) => {
            state.currentUserId = action.payload.id
            state.token = action.payload.token
            console.log(state.currentUserId)
            console.log(state.token)
        }
        
    }
});

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer;
