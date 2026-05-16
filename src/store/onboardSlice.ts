import type { ISong } from "@/components/SongsPicklist"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "./../../node_modules/@reduxjs/toolkit/src/createAction"

export interface PersonalProfile {
  name: string
  age: number
  email: string
  profilePicture: string
}

interface SongsList {
  id: string
  name: string
}

interface PaymentMethod {
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

interface OnboardState {
  currentStep: number
  isCompleted: boolean

  personalProfile: PersonalProfile
  songsList: SongsList[]
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
      state.songsList.push(action.payload)
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
