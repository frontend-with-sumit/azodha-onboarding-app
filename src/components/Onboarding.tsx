import { useStepper } from "@/hooks/useStepper"
import { Box, Heading } from "@chakra-ui/react"
import PersonalProfile from "./PersonalProfile"

const Onboarding = () => {
  const { activeStep, nextStep } = useStepper()

  return (
    <Box>
      {activeStep === 1 && <PersonalProfile nextStep={nextStep} />}
      {activeStep === 2 && <Heading as="h2">Favorite Songs</Heading>}
      {activeStep === 3 && <Heading as="h2">Payment Method</Heading>}
      {activeStep === 4 && <Heading as="h2">Onboarding Complete</Heading>}
    </Box>
  )
}

export default Onboarding
