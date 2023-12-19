export const reduceFormSpecs = <T extends Record<any, any>, newType = string>(
  specs: FormSpecs<T>,
  other?: newType
): FormState<T> =>
  specs.reduce(
    (p, c) => ({
      ...p,
      [c.key]: other !== undefined ? other : c.defaultValue,
    }),
    {} as T
  )
