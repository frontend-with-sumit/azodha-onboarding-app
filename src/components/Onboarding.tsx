import { Box, Heading } from "@chakra-ui/react"
import { useState } from "react"

const Onboarding = () => {
  const [step] = useState(1)

  return (
    <Box>
      {step === 1 && <Heading as="h2">Personal Profile</Heading>}
      {step === 2 && <Heading as="h2">Favorite Songs</Heading>}
      {step === 3 && <Heading as="h2">Payment Method</Heading>}
      {step === 4 && <Heading as="h2">Onboarding Complete</Heading>}
    </Box>
  )
}

export default Onboarding
