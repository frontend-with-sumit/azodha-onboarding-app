import { Button, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import CompWithHeading from "./CompWithHeading"

interface Props {
  previousStep: () => void
  showBackBtn: boolean
}

const OnboardingComplete = ({ previousStep, showBackBtn }: Props) => {
  const navigate = useNavigate()

  const gotoHome = () => navigate("/dashboard")

  return (
    <CompWithHeading
      heading="Final Step"
      showBack={showBackBtn}
      onBack={previousStep}
    >
      <VStack gap={10} width="full">
        <Text>Congratulations!!! Your onboarding is complete</Text>
        <Button onClick={gotoHome} width="full">
          Go to Home
        </Button>
      </VStack>
    </CompWithHeading>
  )
}

export default OnboardingComplete
