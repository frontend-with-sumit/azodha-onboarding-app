import { Box, Button, Field, Input, VStack } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useNavigate } from "react-router"
import CompWithHeading from "./CompWithHeading"
import { PasswordInput } from "./ui/password-input"

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

  const validate = (values: Form) => {
    const errors: Partial<Form> = {}
    const userNameError = values.username !== CREDS.username
    const passwordError = values.password !== CREDS.password

    if (userNameError) errors["username"] = "Invalid username"
    if (passwordError) errors["password"] = "Invalid password"

    return errors
  }

  const handleSubmit = (values: Form) => {
    console.log(values)
    // TODO:Update isAuth state in context and in localStorage
    navigate("/onboarding")
  }

  return (
    <CompWithHeading heading="Login">
      <Box width="2xl">
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={validate}
          validateOnChange={false}
          onSubmit={(values: Form) => handleSubmit(values)}
        >
          {({ errors, values, handleChange, handleSubmit, setFieldError }) => (
            <form onSubmit={handleSubmit}>
              <VStack gap={4} alignItems="start">
                <Field.Root invalid={!!errors.username}>
                  <Field.Label>Username</Field.Label>
                  <Input
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    onChange={(evt) => {
                      if (errors.username) setFieldError("username", "")
                      handleChange(evt)
                    }}
                    autoComplete="username"
                  />
                  <Field.ErrorText>{errors.username}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={(evt) => {
                      if (errors.password) setFieldError("password", "")
                      handleChange(evt)
                    }}
                    autoComplete="password"
                  />
                  <Field.ErrorText>{errors.password}</Field.ErrorText>
                </Field.Root>

                <Button type="submit">Submit</Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </CompWithHeading>
  )
}

export default Login
