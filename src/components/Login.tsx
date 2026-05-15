import { zodValidator } from "@/utils/zodValidator"
import { Box, Button, Field, Input, VStack } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { useNavigate } from "react-router"
import { z } from "zod"
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

const LoginSchema = z
  .object({
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
  })
  .superRefine((values, ctx) => {
    if (values.username && values.username !== CREDS.username) {
      ctx.addIssue({
        code: "custom",
        path: ["username"],
        message: "Invalid username",
      })
    }

    if (values.password && values.password !== CREDS.password) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "Invalid password",
      })
    }
  })

const Login = () => {
  const navigate = useNavigate()

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
          validate={zodValidator(LoginSchema)}
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
