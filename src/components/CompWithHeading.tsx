import { Flex, Heading } from "@chakra-ui/react"
import React from "react"

const CompWithHeading = ({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) => {
  return (
    <Flex direction="column" gap={10}>
      <Heading as="h1" fontSize="5xl" textDecoration="underline">
        {heading}
      </Heading>
      {children}
    </Flex>
  )
}

export default CompWithHeading
