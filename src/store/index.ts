import { gitHubreducer } from './github/gitHub.slice';
import { gitHubApi } from './github/gitHub.api';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer:{
        [gitHubApi.reducerPath]:gitHubApi.reducer , 
        github: gitHubreducer
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware().concat(gitHubApi.middleware)
})

console.log(gitHubApi.middleware)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>