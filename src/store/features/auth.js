import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi, secureApi } from "../../api";
import { activateFeedback, activateLoading, deActivateLoading } from "./errorAndFeedback";

export const loginAttempt = createAsyncThunk("auth/signin", async (userInfo, thunkApi) => {
    
    try {
        thunkApi.dispatch(activateLoading())
        const rs = await publicApi.post("/user/login", userInfo)
        thunkApi.dispatch(deActivateLoading())
        return rs.data
    } catch (error) {
        const error_message = error.response ? error.response.data.message : error.message;
        thunkApi.dispatch(activateFeedback({ status: "error", message: error_message }))
        thunkApi.dispatch(deActivateLoading())
        return thunkApi.rejectWithValue(error_message)

    }

})

export const logoutAttempt = createAsyncThunk("auth/signout", async (user, thunkApi) => {

    try {
        const rs = await publicApi.get("/logout")
        return rs.data
    } catch (error) {

        return thunkApi.rejectWithValue("user logged out")

    }
})

const initialState = {
    user: {}
}
const authUserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAttempt.fulfilled, (state, action) => {
            state.user = action.payload.user
        })
        builder.addCase(loginAttempt.rejected, (state, action) => {
            console.log("rejected action", action.payload)
        })
        builder.addCase(logoutAttempt.pending, (state) => {
            state.user = {}
        })
        builder.addCase(logoutAttempt.fulfilled, (state) => {
            state.user = {}
        })
        builder.addCase(logoutAttempt.rejected, (state) => {
            state.user = {}
        })
    }
})


export const { setAuthUser } = authUserSlice.actions;


//registering new user
export const registerNewUser = (userInfo) => async (dispatch, getState) => {

    let user_data = Object.entries(userInfo).filter(item => item[0] !== "confirm_password")
    user_data = Object.fromEntries(user_data)

    try {
        dispatch(activateLoading())
        const rs = await publicApi.post("/user/register", user_data);
        const userData = rs.data;
        if (rs.status === 201) {
            dispatch(setAuthUser(userData.user))
            dispatch(
                activateFeedback({
                  status: "success",
                  message: `You have been successfully registered..Welcome..${user_data.firstName}.`,
                })
              );
        }
        dispatch(deActivateLoading())

    } catch (error) {
        dispatch(deActivateLoading())
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
    }


}

//update user................. 
export const updateUser = (userInfo) => async (dispatch) => {
    const rs = await secureApi.patch('/user/update', userInfo)
    if (rs.statusText === "OK") {
        let rsData = rs.data;
        console.log("user", rsData.user)
        dispatch(setAuthUser(rsData.user))
    }
}


//fetching auth user...............
export const fetchAuthUser = () => async (dispatch, getState) => {
    try {
        dispatch(activateLoading())
        const rs = await publicApi.get("/getAuthUser");
        const userData = rs.data;
        if (rs.status === 200) {
            dispatch(setAuthUser(userData.user))
        }
        dispatch(deActivateLoading())

    } catch (error) {
        dispatch(deActivateLoading())
    }
}

export default authUserSlice.reducer;