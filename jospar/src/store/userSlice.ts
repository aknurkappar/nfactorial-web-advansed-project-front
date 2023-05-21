import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    currentUserId: String;
    token: String
    josparId : String
}


const initialState: UserState = {
    currentUserId: "",
    token : "",
    josparId : ""
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
        },
        setJosparId : (state, action: PayloadAction<{id : String}>) => {
            state.josparId = action.payload.id
            console.log(state.josparId)
        }
    }
});

export const { setCurrentUser, setJosparId} = userSlice.actions

export default userSlice.reducer;
