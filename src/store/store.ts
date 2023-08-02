import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {launchAPI} from "../services/LaunchService";

const rootReducer = combineReducers({
  [launchAPI.reducerPath]: launchAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(launchAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
