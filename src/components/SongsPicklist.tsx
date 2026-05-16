import { Box, Button, Field, Input, Kbd, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import { useState } from "react"
import CompWithHeading from "./CompWithHeading"
import Song from "./Song"
import { useAppDispatch, useAppSelector } from "@/hooks/useActions"
import { addSong, removeSong, type ISong } from "@/store/onboardSlice"

interface Props {
  showBackBtn: boolean
  nextStep: () => void
  previousStep: () => void
}

interface Form {
  name: string
}

const SongsPicklist = ({ showBackBtn, nextStep, previousStep }: Props) => {
  const songsList = useAppSelector((state) => state.onboarding.songsList)
  const dispatch = useAppDispatch()
  const [songs, setSongs] = useState<ISong[]>(songsList)

  const handleSubmit = (values: Form) => {
    if (!values.name) return
    const newSong = {
      id: crypto.randomUUID(),
      name: values.name,
    }
    setSongs((prev) => [...prev, newSong])
    dispatch(addSong(newSong))
  }

  const handleRemoveSong = (songId: string) => {
    setSongs((prev) => prev.filter((song) => song.id !== songId))
    dispatch(removeSong(songId))
  }

  return (
    <CompWithHeading
      heading="Favorite songs"
      showBack={showBackBtn}
      onBack={previousStep}
    >
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values)
          resetForm()
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field.Root>
              <Input
                name="name"
                placeholder="Enter song name"
                value={values.name}
                onChange={handleChange}
              />
              <Field.HelperText>
                Press <Kbd>Enter</Kbd> to add song
              </Field.HelperText>
            </Field.Root>
          </form>
        )}
      </Formik>

      {songs.length !== 0 && (
        <Box maxH="300px" overflowY="auto" scrollBehavior="smooth">
          <VStack>
            {songs.map((song) => (
              <Song key={song.id} song={song} onRemove={handleRemoveSong} />
            ))}
          </VStack>
        </Box>
      )}

      <Button onClick={nextStep}>Save</Button>
    </CompWithHeading>
  )
}

export default SongsPicklist
