import { Flex, Heading } from "@chakra-ui/react"
import Login from "./components/Login"

function App() {
  return (
    <Flex
      width="full"
      height="100vh"
      direction="column"
      gap={10}
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" fontSize="5xl" textDecoration="underline">
        Azodha
      </Heading>
      <Login />
    </Flex>
  )
}

export default App
