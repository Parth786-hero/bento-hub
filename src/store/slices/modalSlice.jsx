import {createSlice} from '@reduxjs/toolkit';
const modalSlice = createSlice({
    name : "modalSlice",
    initialState : {
        show : false,
        mode : null , 
       
    },
    reducers : {
        changeModalStatus(state , action){
            const {show , mode , formData , setFormData} = action.payload;
            state.show = show;
            state.mode = mode;
            
        }
    }
});

export const { changeModalStatus } = modalSlice.actions;

export default modalSlice.reducer;