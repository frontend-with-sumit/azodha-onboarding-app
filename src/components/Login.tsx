import { Box, Button, Field, Input, VStack } from "@chakra-ui/react"
import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { PasswordInput } from "./ui/password-input"
import CompWithHeading from "./CompWithHeading"
import { useNavigate } from "react-router"

const CREDS = {
  username: "user123",
  password: "password123",
}

interface Form {
  username: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<Form>({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSubmit = (evt: SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const usernameError = form.username !== CREDS.username
    const passwordError = form.password !== CREDS.password

    if (usernameError || passwordError)
      return setErrors({
        username: usernameError,
        password: passwordError,
      })

    // TODO:Update isAuth state in context and in localStorage

    navigate("/onboarding")
  }

  return (
    <CompWithHeading heading="Login">
      <Box width="2xl">
        <form onSubmit={handleSubmit} method="POST">
          <VStack gap={4} alignItems="start">
            <Field.Root invalid={errors.username}>
              <Field.Label>Username</Field.Label>
              <Input
                placeholder="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              <Field.ErrorText>Invalid username</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={errors.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <Field.ErrorText>Invalid password</Field.ErrorText>
            </Field.Root>

            <Button type="submit">Submit</Button>
          </VStack>
        </form>
      </Box>
    </CompWithHeading>
  )
}

export default Login
