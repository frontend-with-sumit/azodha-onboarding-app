import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import onboardReducer from "./onboardSlice"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("app")

    if (!serializedState) return undefined

    return JSON.parse(serializedState)
  } catch {
    return undefined
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
})

store.subscribe(() => {
  localStorage.setItem("app", JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
