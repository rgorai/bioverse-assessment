type FormSpecs<T extends Record<any, any>> = {
  key: keyof T
  label: string
  type: string
  defaultValue: string
  required: boolean
  validation: (value: string) => void
  hasError?: string
  props?: Record<any, any>
}[]

type FormState<T, type = string> = { [key in keyof T]: type }
