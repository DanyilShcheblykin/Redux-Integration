import { gitHubreducer } from './github/gitHub.slice';
import { gitHubApi } from './github/gitHub.api';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query';

function exampleMiddleware(storeAPI: any) {
    return function wrapDispatch(next: any) {
      return function handleAction(action: any) {
        if (action.payload !== undefined) {
          if (action.payload.length) {
            action.payload = action.payload.slice(0 , -1);
          }
        }
  
        return next(action);
      };
    };
  }

export const store = configureStore({
    reducer:{
        [gitHubApi.reducerPath]:gitHubApi.reducer , 
        github: gitHubreducer
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware().concat(gitHubApi.middleware , exampleMiddleware)
})

console.log(gitHubApi.middleware)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>