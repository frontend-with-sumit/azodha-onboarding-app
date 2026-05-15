import { Box, Button, Field, Input, Kbd, VStack } from "@chakra-ui/react"
import { Formik } from "formik"
import { useState } from "react"
import CompWithHeading from "./CompWithHeading"
import Song from "./Song"

interface Props {
  showBackBtn: boolean
  nextStep: () => void
  previousStep: () => void
}

interface Form {
  name: string
}

export interface ISong {
  id: string
  name: string
}

const SongsPicklist = ({ showBackBtn, nextStep, previousStep }: Props) => {
  const [songs, setSongs] = useState<ISong[]>([])

  const handleSubmit = (values: Form) => {
    console.log(values)

    if (!values.name) return
    // onSuccess save the data to context and update Local Storage
    const newSong = {
      id: crypto.randomUUID(),
      name: values.name,
    }
    setSongs((prev) => [...prev, newSong])
  }

  const handleRemoveSong = (songId: string) =>
    setSongs((prev) => prev.filter((song) => song.id !== songId))

  return (
    <CompWithHeading
      heading="Pick your favorite songs"
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
                placeholder="Search for a song"
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
