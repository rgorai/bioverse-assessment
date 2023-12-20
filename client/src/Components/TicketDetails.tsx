import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import Form from 'react-bootstrap/esm/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/esm/Button'
import { areValidStrings } from '../utils/errorChecks'
import {
  getTicketDetails,
  sendTicketResponse,
  updateTicketStatus,
} from '../services/tickets'
import styles from '../styles/ticketDetails.module.scss'
import layoutStyles from '../styles/ticketsPage.module.scss'
import STATUSES from '../tson/statuses'
import PageLoader from './PageLoader'

const TicketDetails = () => {
  const [ticketDetails, setTicketsDetails] = useState<ApiTicket | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageError, setPageError] = useState<ServerError | null>(null)
  const [responseText, setResponseText] = useState('')
  const [currStatus, setCurrStatus] = useState<ApiStatus | null>(null)
  const { ticketId } = useParams()

  const requestTicketDetails = useCallback((id: string) => {
    // error check
    try {
      areValidStrings({ id })
    } catch (err) {
      return setPageError({ status: '400', statusText: 'Bad Input' })
    }

    // request data
    setLoading(true)
    getTicketDetails(id)
      .then(({ data }) => {
        setTicketsDetails(data)
        setCurrStatus(data.status)
      })
      .catch(({ response }) => setPageError(response))
      .then(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (ticketId) requestTicketDetails(ticketId)
  }, [requestTicketDetails, ticketId])

  const onResponseSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (ev) => {
      ev.preventDefault()

      if (ticketId)
        sendTicketResponse(ticketId, responseText.trim())
          .then(({ data }) => console.log(data))
          .catch(({ response }) =>
            console.error('response submission error', response)
          )
    },
    [responseText, ticketId]
  )

  const onStatusUpdateSubmit: React.FormEventHandler<HTMLFormElement> =
    useCallback(
      (ev) => {
        ev.preventDefault()

        if (ticketId && currStatus !== null)
          updateTicketStatus(ticketId, currStatus)
            .then(({ data }) => console.log('status update success', data))
            .catch(({ response }) =>
              console.error('status update error', response)
            )
      },
      [currStatus, ticketId]
    )

  return (
    <PageLoader loading={loading} error={pageError} pageData={ticketDetails}>
      {(pageData) => (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <h1 className="mb-4">Details for ticket {pageData._id}</h1>

            <div className={cx(layoutStyles.heading, styles.heading)}>
              <div
                className={cx(
                  layoutStyles.status,
                  layoutStyles[`status-${pageData.status}`]
                )}
              >
                {STATUSES[pageData.status]}
              </div>

              <div className={layoutStyles.date}>
                {new Date(pageData.updatedDate).toLocaleString()}
              </div>
            </div>

            <div className={layoutStyles.name}>{pageData.name}</div>
            <div className="mb-3">{pageData.email}</div>

            <div className={cx(styles.description, 'mt-4 mb-5')}>
              <em>{pageData.description}</em>
            </div>

            <div className={styles.forms}>
              <Form className={styles.responseForm} onSubmit={onResponseSubmit}>
                <FloatingLabel label="Send Response" controlId="response">
                  <Form.Control
                    value={responseText}
                    onChange={(ev) => setResponseText(ev.target.value)}
                    placeholder=""
                    required
                    as="textarea"
                    style={{ height: '8em' }}
                  />
                </FloatingLabel>

                <Button className="mt-3" type="submit">
                  Submit
                </Button>
              </Form>

              <Form onSubmit={onStatusUpdateSubmit}>
                <Form.Label>Update Status</Form.Label>
                {Object.entries(STATUSES).map(([k, v]) => (
                  <Form.Check
                    id={`radio-${k}`}
                    type="radio"
                    value={k}
                    label={v}
                    onChange={(ev) =>
                      setCurrStatus(Number(ev.target.value) as ApiStatus)
                    }
                    checked={currStatus !== null && currStatus === Number(k)}
                    key={k}
                  />
                ))}

                <Button className="mt-3" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </PageLoader>
  )
}

export default TicketDetails
