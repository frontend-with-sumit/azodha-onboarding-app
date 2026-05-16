import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import React from "react"

const CompWithHeading = ({
  heading,
  showBack,
  onBack,
  children,
}: {
  heading: string
  showBack?: boolean
  onBack?: () => void
  children: React.ReactNode
}) => {
  return (
    <Flex direction="column" gap={10} width="550px">
      <VStack alignItems="flex-start" gap={4}>
        {showBack && (
          <Button
            variant="plain"
            fontSize="xs"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={onBack}
            padding={0}
          >
            back
          </Button>
        )}
        <Heading as="h1" fontSize="4xl" textDecoration="underline">
          {heading}
        </Heading>
      </VStack>
      {children}
    </Flex>
  )
}

export default CompWithHeading
