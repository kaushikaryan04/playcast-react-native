import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
    "auth/loginUser",
    async ({username , password} ,{rejectWithValue}) => {
        try {
            const response = await fetch('localhost:8000/api/login' ,{
                method : 'POST',
                headers : {'Content-Type' :"application/json"},
                body : JSON.stringify({username , password})
            });
            if (!response.ok) throw new Error("login failed")

            const data = await response.json() ; 
            return data ;
        }catch (error) {
            return rejectWithValue(error.message)
        }
    }
)



/*
Logistic Regression
confusion matrix
decision trees
Clustering 
Random forest algo
KNN algo
Linear regression 
K mean clustering
Classification
Supervised and Unsupervised learning algorithm.
*/