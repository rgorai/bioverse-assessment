import { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import styles from '../styles/ticketsPage.module.scss'
import { getAllTickets } from '../services/tickets'
import STATUSES from '../tson/statuses'
import PageLoader from './PageLoader'

const TicketsPage = () => {
  const [ticketsData, setTicketsData] = useState<ApiTicket[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)

  const requestTicketsData = useCallback(() => {
    setLoading(true)
    getAllTickets()
      .then(({ data }) => setTicketsData(data))
      .catch(({ response }) => setPageError(response))
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    requestTicketsData()
  }, [requestTicketsData])

  return (
    <PageLoader loading={loading} error={pageError} pageData={ticketsData}>
      {(pageData) => (
        <div className={styles.container}>
          <h1 className="mb-5">All Tickets</h1>
          <div className={styles.listWrapper}>
            {pageData.map((e) => (
              <div className={styles.ticketListItem} key={e._id}>
                <div className={styles.infoContainer}>
                  <div className={styles.heading}>
                    <div
                      className={cx(
                        styles.status,
                        styles[`status-${e.status}`]
                      )}
                    >
                      {STATUSES[e.status]}
                    </div>

                    <div className={styles.date}>
                      {new Date(e.updatedDate).toLocaleString()}
                    </div>
                  </div>

                  <div className={styles.name}>{e.name}</div>
                  <div className="mb-3">{e.email}</div>

                  <div className={styles.description}>
                    <em>{e.description}</em>
                  </div>
                </div>

                <Link
                  className="btn btn-outline-secondary"
                  to={`/tickets/${e._id}`}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageLoader>
  )
}

export default TicketsPage
