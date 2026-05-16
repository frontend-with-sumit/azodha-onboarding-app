import { useStepper } from "@/hooks/useStepper"
import { Box } from "@chakra-ui/react"
import OnboardingComplete from "./OnboardingComplete"
import PaymentMethod from "./PaymentMethod"
import PersonalProfile from "./PersonalProfile"
import SongsPicklist from "./SongsPicklist"

const Onboarding = () => {
  const { activeStep, nextStep, previousStep } = useStepper()

  return (
    <Box>
      {activeStep === 1 && <PersonalProfile nextStep={nextStep} />}
      {activeStep === 2 && (
        <SongsPicklist
          nextStep={nextStep}
          previousStep={previousStep}
          showBackBtn
        />
      )}
      {activeStep === 3 && (
        <PaymentMethod
          nextStep={nextStep}
          previousStep={previousStep}
          showBackBtn
        />
      )}
      {activeStep === 4 && (
        <OnboardingComplete showBackBtn previousStep={previousStep} />
      )}
    </Box>
  )
}

export default Onboarding
