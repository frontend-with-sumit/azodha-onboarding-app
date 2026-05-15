export const hasErrors = <T>(errors: Partial<T>) =>
  Object.keys(errors).length > 0
