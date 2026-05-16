import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./useActions"
import { updateCurrentStep } from "@/store/onboardSlice"

export const useStepper = () => {
  const currentStep = useAppSelector((state) => state.onboarding.currentStep)
  const dispatch = useAppDispatch()

  const [activeStep, setActiveStep] = useState(currentStep)

  useEffect(() => {
    dispatch(updateCurrentStep(activeStep))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep])

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, 4))

  const previousStep = () => setActiveStep((prev) => Math.max(prev - 1, 1))

  return {
    activeStep,
    nextStep,
    previousStep,
  }
}
