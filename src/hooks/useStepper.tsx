import { useState } from "react"

export const useStepper = () => {
  const [activeStep, setActiveStep] = useState(1)

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, 4))
  const previousStep = () => setActiveStep((prev) => Math.max(prev - 1, 1))

  return {
    activeStep,
    nextStep,
    previousStep,
  }
}
