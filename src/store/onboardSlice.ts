import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "./../../node_modules/@reduxjs/toolkit/src/createAction"

export interface PersonalProfile {
  name: string
  age: number
  email: string
  profilePicture: string
}

export interface ISong {
  id: string
  name: string
}

export interface PaymentMethod {
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

interface OnboardState {
  currentStep: number
  isCompleted: boolean

  personalProfile: PersonalProfile
  songsList: ISong[]
  paymentMethod: PaymentMethod
}

const initialState: OnboardState = {
  currentStep: 1,
  isCompleted: false,

  personalProfile: {
    name: "",
    age: 0,
    email: "",
    profilePicture: "",
  },

  songsList: [],

  paymentMethod: {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  },
}

const onboardSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    updatePersonalProfile: (state, action: PayloadAction<PersonalProfile>) => {
      state.personalProfile = action.payload
    },
    addSong: (state, action: PayloadAction<ISong>) => {
      const songsClone = [...state.songsList]
      songsClone.push(action.payload)
      state.songsList = songsClone
    },
    removeSong: (state, action: PayloadAction<string>) => {
      const songs = state.songsList.filter((song) => song.id !== action.payload)
      state.songsList = songs
    },
    updatePaymentInfo: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload
    },
    completeOnboarding: (state) => {
      state.isCompleted = true
    },
  },
})

export const {
  updateCurrentStep,
  updatePersonalProfile,
  addSong,
  removeSong,
  updatePaymentInfo,
  completeOnboarding,
} = onboardSlice.actions

export default onboardSlice.reducer
