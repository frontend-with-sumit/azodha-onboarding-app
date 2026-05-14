import { Flex, Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"

const CompWithHeading = ({
  heading,
  showBack,
  children,
}: {
  heading: string
  showBack?: boolean
  children: React.ReactNode
}) => {
  return (
    <Flex direction="column" gap={10}>
      <VStack alignItems="flex-start" gap={4}>
        {showBack && (
          <Text
            display="inline-block"
            fontSize="xs"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            back
          </Text>
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
