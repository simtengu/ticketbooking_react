import { createSlice } from "@reduxjs/toolkit";
import { publicApi } from "../../api";
import { activateFeedback, activateLoading, deActivateLoading } from "./errorAndFeedback";

const initialState = {
    user: {}
}
const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload
        }
    }
})


export const { setAuthUser } = authUserSlice.actions;

export const registerNewUser = (userInfo) => async (dispatch, getState) => {

    let user_data = Object.entries(userInfo).filter(item => item[0] !== "confirm_password")
    user_data = Object.fromEntries(user_data)
    console.log('userInfo', userInfo)
    console.log('userdata', user_data)
    try {
        dispatch(activateLoading())
        const rs = await publicApi.post("/user/register", user_data);
        const userData = rs.data;
        if (rs.status === 201) {
            dispatch(setAuthUser(userData))
            dispatch(activateFeedback({ status: "success", message: "Congratulations you have been successfully registered" }))
        }
        dispatch(deActivateLoading())

    } catch (error) {
        dispatch(deActivateLoading())
        const error_message = error.response ? error.response.data.message : error.message
        dispatch(activateFeedback({ status: "error", message: error_message }))
    }


}

export default authUserSlice.reducer;