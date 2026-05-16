import { useAppDispatch, useAppSelector } from "@/hooks/useActions"
import { login } from "@/store/authSlice"
import { zodValidator } from "@/utils/zodValidator"
import { Box, Button, Field, Input, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import { useNavigate } from "react-router"
import { z } from "zod"
import CompWithHeading from "./CompWithHeading"
import { PasswordInput } from "./ui/password-input"
import { useEffect } from "react"

const CREDS = {
  username: "user123",
  password: "password123",
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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  const handleSubmit = () => {
    dispatch(login())
    navigate("/onboarding")
  }

  return (
    <CompWithHeading heading="Login">
      <Box width="2xl">
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={zodValidator(LoginSchema)}
          validateOnChange={false}
          onSubmit={handleSubmit}
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

                <Button type="submit">Login</Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </CompWithHeading>
  )
}

export default Login
