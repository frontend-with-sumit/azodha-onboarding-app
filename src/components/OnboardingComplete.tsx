import { Button, Text, VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import CompWithHeading from "./CompWithHeading"
import { useAppDispatch } from "@/hooks/useActions"
import { completeOnboarding } from "@/store/onboardSlice"

interface Props {
  previousStep: () => void
  showBackBtn: boolean
}

const OnboardingComplete = ({ previousStep, showBackBtn }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const gotoHome = () => {
    dispatch(completeOnboarding())
    navigate("/dashboard")
  }

  return (
    <CompWithHeading
      heading="Final Step"
      showBack={showBackBtn}
      onBack={previousStep}
    >
      <VStack gap={10} width="full">
        <Text>Congratulations!!! Your onboarding is complete</Text>
        <Button onClick={gotoHome} width="full">
          Finish
        </Button>
      </VStack>
    </CompWithHeading>
  )
}

export default OnboardingComplete
