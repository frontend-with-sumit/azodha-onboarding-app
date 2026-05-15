import { useStepper } from "@/hooks/useStepper"
import { Box, Heading } from "@chakra-ui/react"
import PersonalProfile from "./PersonalProfile"
import PaymentMethod from "./PaymentMethod"
import OnboardingComplete from "./OnboardingComplete"

const Onboarding = () => {
  const { activeStep, nextStep, previousStep } = useStepper()

  return (
    <Box>
      {activeStep === 1 && <PersonalProfile nextStep={nextStep} />}
      {activeStep === 2 && <Heading as="h2">Favorite Songs</Heading>}
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
