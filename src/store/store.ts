import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {launchAPI} from "../services/LaunchService";
import {rocketAPI} from "../services/RocketService";

const rootReducer = combineReducers({
  [launchAPI.reducerPath]: launchAPI.reducer,
  [rocketAPI.reducerPath]: rocketAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        launchAPI.middleware,
        rocketAPI.middleware
      ])
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
