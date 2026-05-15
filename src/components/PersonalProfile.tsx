import { Avatar, Button, Field, HStack, Input, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import CompWithHeading from "./CompWithHeading"
import { hasErrors } from "@/utils/hasErrors"

interface Props {
  nextStep: () => void
}

interface Form {
  fullname: string
  age: number | string
  email: string
  avatar: string
}

const PersonalProfile = ({ nextStep }: Props) => {
  const validate = (values: Form) => {
    const errors: Partial<Form> = {}
    if (!values.fullname) errors["fullname"] = "Full name is required"
    if (!values.age) errors["age"] = "Age is required"
    if (!values.email) errors["email"] = "Email is required"

    return errors
  }

  const handleSubmit = (values: Form) => {
    console.log(values)
    // TODO: save the step data to context and localStorage
    // move to the next step
    nextStep()
  }

  return (
    <CompWithHeading heading="Personal Profile">
      <Formik
        initialValues={{
          fullname: "",
          age: 0,
          email: "",
          avatar: "https://bit.ly/sage-adebayo",
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          values,
          touched,
          dirty,
          handleSubmit,
          handleChange,
          setFieldError,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Avatar.Root size="2xl">
                <Avatar.Fallback name={values.fullname ?? "User"} />
                <Avatar.Image src={values.avatar} />
              </Avatar.Root>

              <HStack gap={2}>
                <Field.Root
                  invalid={touched.fullname && !!errors.fullname}
                  required
                >
                  <Field.Label>
                    Full Name <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Full Name"
                    name="fullname"
                    value={values.fullname}
                    onChange={(evt) => {
                      if (errors.fullname) setFieldError("fullname", "")
                      handleChange(evt)
                    }}
                    onBlur={handleBlur}
                    autoComplete="fullname"
                  />
                  <Field.ErrorText>{errors.fullname}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={touched.age && !!errors.age} required>
                  <Field.Label>
                    Age (in years) <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Age"
                    name="age"
                    type="number"
                    value={values.age}
                    onChange={(evt) => {
                      if (errors.age) setFieldError("age", "")
                      handleChange(evt)
                    }}
                    onBlur={handleBlur}
                    autoComplete="age"
                  />
                  <Field.ErrorText>{errors.age}</Field.ErrorText>
                </Field.Root>
              </HStack>

              <Field.Root invalid={touched.email && !!errors.email} required>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(evt) => {
                    if (errors.email) setFieldError("email", "")
                    handleChange(evt)
                  }}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              </Field.Root>

              <Button
                type="submit"
                width="full"
                disabled={!dirty || hasErrors(errors)}
              >
                Save
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </CompWithHeading>
  )
}

export default PersonalProfile
