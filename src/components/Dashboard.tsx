import { useAppSelector } from "@/hooks/useActions"
import { Box, Heading } from "@chakra-ui/react"

const Dashboard = () => {
  const user = useAppSelector((state) => state.onboarding.personalProfile.name)

  return (
    <Box>
      <Heading as="h2" fontSize="4xl">
        Welcome, <u>{user}</u> 👋🏻
      </Heading>
    </Box>
  )
}

export default Dashboard
