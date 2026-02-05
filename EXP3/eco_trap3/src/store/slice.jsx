import React from 'react'
import {configureStore, createSlice} from '@reduxjs/toolkit';
import LogsReducer from './logsSlice';


const store = configureStore({
    reducer: {
        logs: LogsReducer,
    }, 
});
export default store;