import { useStepper } from "@/hooks/useStepper"
import { Box, Heading } from "@chakra-ui/react"
import PersonalProfile from "./PersonalProfile"
import PaymentMethod from "./PaymentMethod"

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
      {activeStep === 4 && <Heading as="h2">Onboarding Complete</Heading>}
    </Box>
  )
}

export default Onboarding
