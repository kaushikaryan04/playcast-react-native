import {createSlice , createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios" ;

interface UserState { 
    username : string | null;
    firstName  : string | null ; 
    email : string | null ;
    access_token : string | null ; 
    isAuthenticated : boolean ;

}

const initialState : UserState = {
    username: null ,
    firstName: null , 
    email: null , 
    access_token : null ,
    isAuthenticated : false 
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userCredentials : {username : string , password : string }) => {
        console.log(userCredentials.username)
        console.log(userCredentials.password)
        
        const response = await axios.post("http://localhost:8000/api/login", {
            username: userCredentials.username, 
            password: userCredentials.password,
        }) 

        const access_token = response.data.access 
        console.log(access_token)
        const final_response = await axios.get("http://localhost:8000/api/userinfo", 
            {
                headers: {
                  Authorization: `Bearer ${access_token}`
                }
            }
        )
        return {
            ...final_response.data,
            access_token: access_token
        };
    }
)

const authSlice = createSlice({
    name : "auth" , 
    initialState,
    reducers : {
        logout : (state) => {
            state.firstName = null 
            state.email = null 
            state.username = null 
            state.access_token = null
            state.isAuthenticated = false 
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state , action : PayloadAction<{username : string ; email : string ; first_name : string ; access_token : string}>) => {
                state.username = action.payload.username; 
                state.firstName = action.payload.first_name;
                state.email = action.payload.email; 
                state.isAuthenticated = true;
                state.access_token = action.payload.access_token;
            })
    },

})


export const { logout  } = authSlice.actions;
export default authSlice.reducer;