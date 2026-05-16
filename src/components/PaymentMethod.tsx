import { Button, Field, HStack, Input, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import CompWithHeading from "./CompWithHeading"
import { hasErrors } from "@/utils/hasErrors"
import { z } from "zod"
import { zodValidator } from "@/utils/zodValidator"
import { updatePaymentInfo, type PaymentMethod } from "@/store/onboardSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useActions"

interface Props {
  showBackBtn?: boolean
  nextStep: () => void
  previousStep: () => void
}

const PaymentMethodSchema = z.object({
  cardNumber: z
    .string()
    .transform((value) => value.replace(/\s/g, ""))
    .pipe(z.string().regex(/^\d{16}$/, "Card number must be 16 digits")),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),

  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),

  nameOnCard: z.string().min(1, "Name on card is required"),
})

const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

const PaymentMethod = ({ nextStep, previousStep, showBackBtn }: Props) => {
  const paymentInfo = useAppSelector((state) => state.onboarding.paymentMethod)
  const dispatch = useAppDispatch()

  const handleSubmit = (values: PaymentMethod) => {
    dispatch(updatePaymentInfo(values))
    nextStep()
  }

  const invalidForm = (values: PaymentMethod) =>
    !values.cardNumber ||
    !values.cvv ||
    !values.expiryDate ||
    !values.nameOnCard

  return (
    <CompWithHeading
      heading="Payment Method"
      showBack={showBackBtn}
      onBack={previousStep}
    >
      <Formik
        initialValues={{
          cardNumber: paymentInfo.cardNumber,
          expiryDate: paymentInfo.expiryDate,
          cvv: paymentInfo.cvv,
          nameOnCard: paymentInfo.nameOnCard,
        }}
        validate={zodValidator(PaymentMethodSchema)}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          values,
          touched,
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

export default PaymentMethod
