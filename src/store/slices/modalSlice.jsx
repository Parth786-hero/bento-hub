import {createSlice} from '@reduxjs/toolkit';
const modalSlice = createSlice({
    name : "modalSlice",
    initialState : {
        show : false,
        mode : null , 
       payload : null
    },
    reducers : {
        changeModalStatus(state , action){
            const {show , mode } = action.payload;
            state.show = show;
            state.mode = mode;
            state.payload = action.payload.payload || null
            
        }
    }
});

export const { changeModalStatus } = modalSlice.actions;

export default modalSlice.reducer;