import { Button, Field, HStack, Input, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import CompWithHeading from "./CompWithHeading"
import { hasErrors } from "@/utils/hasErrors"

interface Props {
  showBackBtn?: boolean
  nextStep: () => void
  previousStep: () => void
}

interface Form {
  cardNumber: string | number
  expiryDate: string
  cvv: number | string
  nameOnCard: string
}

const validate = (values: Form) => {
  const errors: Partial<Form> = {}
  const cleanCardNumber = values.cardNumber.toString().replace(/\s/g, "")

  if (!values.cardNumber) errors["cardNumber"] = "Card number is required"
  else if (!/^\d{16}$/.test(cleanCardNumber.toString()))
    errors["cardNumber"] = "Card number must be 16 digits"

  if (!values.expiryDate) errors["expiryDate"] = "Expiry date is required"
  else if (!/^\d{2}\/\d{2}$/.test(values.expiryDate))
    errors["expiryDate"] = "Expiry date must be in MM/YY format"

  if (!values.cvv) errors["cvv"] = "CVV is required"
  else if (!/^\d{3}$/.test(values.cvv.toString()))
    errors["cvv"] = "CVV must be 3 digits"

  if (!values.nameOnCard) errors["nameOnCard"] = "Name on card is required"

  return errors
}

const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

const PaymentMethod = ({ nextStep, previousStep, showBackBtn }: Props) => {
  const handleSubmit = (values: Form) => {
    console.log(values)

    // onSuccess callback to save the payment method details in context or localStorage can be added here

    nextStep()
  }

  return (
    <CompWithHeading
      heading="Payment Method"
      showBack={showBackBtn}
      onBack={previousStep}
    >
      <Formik
        initialValues={{
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          nameOnCard: "",
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
          setFieldValue,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Field.Root
                invalid={touched.cardNumber && !!errors.cardNumber}
                required
              >
                <Field.Label>
                  Card Number <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Card Number"
                  name="cardNumber"
                  value={values.cardNumber}
                  onChange={(evt) => {
                    if (errors.cardNumber) setFieldError("cardNumber", "")
                    setFieldValue(
                      "cardNumber",
                      formatCardNumber(evt.target.value),
                    )
                  }}
                  onBlur={handleBlur}
                  maxLength={19}
                  autoComplete="fullname"
                />
                <Field.ErrorText>{errors.cardNumber}</Field.ErrorText>
              </Field.Root>

              <HStack gap={4}>
                <Field.Root
                  invalid={touched.expiryDate && !!errors.expiryDate}
                  required
                >
                  <Field.Label>
                    Expiry Date <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="MM/YY"
                    name="expiryDate"
                    value={values.expiryDate}
                    onChange={(evt) => {
                      if (errors.expiryDate) setFieldError("expiryDate", "")
                      handleChange(evt)
                    }}
                    onBlur={handleBlur}
                    maxLength={5}
                    autoComplete="expiry"
                  />
                  <Field.ErrorText>{errors.expiryDate}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={touched.cvv && !!errors.cvv} required>
                  <Field.Label>
                    CVV <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="CVV"
                    name="cvv"
                    value={values.cvv}
                    onChange={(evt) => {
                      if (errors.cvv) setFieldError("cvv", "")
                      handleChange(evt)
                    }}
                    onBlur={handleBlur}
                    autoComplete="cvv"
                    maxLength={3}
                  />
                  <Field.ErrorText>{errors.cvv}</Field.ErrorText>
                </Field.Root>
              </HStack>

              <Field.Root
                invalid={touched.nameOnCard && !!errors.nameOnCard}
                required
              >
                <Field.Label>
                  Name on Card <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Name on Card"
                  name="nameOnCard"
                  value={values.nameOnCard}
                  onChange={(evt) => {
                    if (errors.nameOnCard) setFieldError("nameOnCard", "")
                    handleChange(evt)
                  }}
                  onBlur={handleBlur}
                  autoComplete="name"
                />
                <Field.ErrorText>{errors.nameOnCard}</Field.ErrorText>
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

export default PaymentMethod
