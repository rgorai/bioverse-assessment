import Loading from './Loading'
import ServerError from './ServerError'

type Props<T> = {
  loading: boolean
  error: ServerError | null
  pageData: T
  children: (pageData: NonNullable<T>) => JSX.Element
}

// eslint-disable-next-line comma-spacing
const PageLoader = <T,>({ loading, error, pageData, children }: Props<T>) =>
  loading ? (
    <Loading />
  ) : error ? (
    <ServerError {...error} />
  ) : pageData ? (
    <>{children(pageData)}</>
  ) : null

export default PageLoader
