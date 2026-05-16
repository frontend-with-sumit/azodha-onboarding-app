import { Flex, Icon, Text } from "@chakra-ui/react"
import { FaXmark } from "react-icons/fa6"
import type { ISong } from "./SongsPicklist"

const Song = ({
  song,
  onRemove,
}: {
  song: ISong
  onRemove: (songId: string) => void
}) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      width="full"
      paddingBlock={2}
      paddingInline={4}
      border="1px solid"
      borderColor="gray.100"
      borderRadius="md"
    >
      <Text fontSize="sm">{song.name}</Text>
      <Icon size="sm" cursor="pointer" onClick={() => onRemove(song.id)}>
        <FaXmark />
      </Icon>
    </Flex>
  )
}

export default Song
