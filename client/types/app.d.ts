/**
 * @author rgorai
 * @description specifications of the application's features, used to generate certain aspects of the app automatically
 * @param label user-facing label of the feature
 * @param path router path to use for this feature
 * @param element element to render for this feature
 */
type AppSpecs = {
  label: string
  path: string
  element: JSX.Element
  showOnNavbar?: boolean
}[]

/**
 * @author rgorai
 * @description details of a web error
 * @param status http status code
 * @param statusText text describing the status code
 * @param data any associated error data
 */
type ServerError = {
  status: string
  statusText: string
  data?: string
}
