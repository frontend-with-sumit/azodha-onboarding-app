import { Flex } from "@chakra-ui/react"
import { Route, Routes } from "react-router"
import Login from "./components/Login"
import Onboarding from "./components/Onboarding"

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
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Flex>
  )
}

export default App
