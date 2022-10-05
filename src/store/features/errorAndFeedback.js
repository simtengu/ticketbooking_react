import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    feedback: {
        isActive: false,
        status: "",
        message: "",
    },
    isLoading: false,
    isModalOpen:false,
    isAdminLeftBarOpen: false
};
const feedBackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        activateFeedback: (state, action) => {
            state.feedback = {...action.payload,isActive:true}
        },
        deActivateFeedback: (state)=>{
            state.feedback = initialState.feedback

        },
        activateLoading: (state)=>{
            state.isLoading = true
        },
        deActivateLoading: (state)=>{
            state.isLoading = false
        },
        openModal: (state)=>{
            state.isModalOpen = true
        },
        closeModal: (state)=>{
            state.isModalOpen = false
        },
        openAdminLeftBar: (state) => {
            state.isAdminLeftBarOpen = true
        },
        closeAdminLeftBar: (state) => {
            state.isAdminLeftBarOpen = false
        }
    }

})

export const{openAdminLeftBar,closeAdminLeftBar, openModal,closeModal, activateFeedback,deActivateFeedback,activateLoading,deActivateLoading} = feedBackSlice.actions;

export default feedBackSlice.reducer