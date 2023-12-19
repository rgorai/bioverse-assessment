import cx from 'classnames'
import styles from '../styles/errorPage.module.scss'

const ServerError = (props: ServerError) => (
  <div className={styles.pageContainer}>
    <div className={styles.errorContainer}>
      <div className={styles.errorStatus}>{props.status}</div>
      <div className={cx(styles.errorText, 'text-muted')}>
        {props.statusText}
      </div>
    </div>
  </div>
)

export default ServerError
