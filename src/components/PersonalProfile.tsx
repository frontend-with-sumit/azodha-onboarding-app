import { useAppDispatch, useAppSelector } from "@/hooks/useActions"
import {
  updateCurrentStep,
  updatePersonalProfile,
  type PersonalProfile,
} from "@/store/onboardSlice"
import { hasErrors } from "@/utils/hasErrors"
import { zodValidator } from "@/utils/zodValidator"
import { Avatar, Button, Field, HStack, Input, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import { z } from "zod"
import CompWithHeading from "./CompWithHeading"

interface Props {
  nextStep: () => void
}

const ProfileSchema = z.object({
  name: z.string().nonempty("Full name is required"),
  age: z
    .number({ message: "Age is required" })
    .nonnegative("Age should be positive"),
  email: z.email().nonempty("Email is required"),
})

const PersonalProfile = ({ nextStep }: Props) => {
  const profile = useAppSelector((state) => state.onboarding.personalProfile)
  const dispatch = useAppDispatch()

  const handleSubmit = (values: PersonalProfile) => {
    dispatch(updatePersonalProfile(values))
    dispatch(updateCurrentStep(2))
    nextStep()
  }

  const invalidForm = (values: PersonalProfile) =>
    !values.name || !values.age || !values.email

  return (
    <CompWithHeading heading="Profile">
      <Formik
        initialValues={{
          name: profile.name,
          age: profile.age,
          email: profile.email,
          profilePicture: "https://bit.ly/sage-adebayo",
        }}
        validate={zodValidator(ProfileSchema)}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          values,
          touched,
          handleSubmit,
          handleChange,
          setFieldError,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Avatar.Root size="2xl">
                <Avatar.Fallback name={values.name ?? "User"} />
                <Avatar.Image src={values.profilePicture} />
              </Avatar.Root>

              <HStack gap={2} width="full">
                <Field.Root invalid={touched.name && !!errors.name} required>
                  <Field.Label>
                    Full Name <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Full Name"
                    name="name"
                    value={values.name}
                    onChange={(evt) => {
                      if (errors.name) setFieldError("name", "")
                      handleChange(evt)
                    }}
                    onBlur={handleBlur}
                    autoComplete="name"
                  />
                  <Field.ErrorText>{errors.name}</Field.ErrorText>
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
                disabled={invalidForm(values) || hasErrors(errors)}
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
