import { Flex } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router"
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Flex>
  )
}

export default App
