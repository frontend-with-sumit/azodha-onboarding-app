import type { ZodSchema } from "zod"

export const zodValidator =
  <T>(schema: ZodSchema<T>) =>
  (values: T) => {
    const result = schema.safeParse(values)

    if (result.success) return {}

    return result.error.issues.reduce(
      (acc, error) => {
        const field = error.path[0]

        if (field) {
          acc[field as string] = error.message
        }

        return acc
      },
      {} as Record<string, string>,
    )
  }
