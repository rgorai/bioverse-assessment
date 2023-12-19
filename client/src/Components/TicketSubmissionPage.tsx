import { Fragment, useCallback, useEffect, useState } from 'react'
import Form from 'react-bootstrap/esm/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Button from 'react-bootstrap/esm/Button'
import styles from '../styles/ticketSubmissionPage.module.scss'
import { submitTicket } from '../services/tickets'
import { areValidStrings, isValidEmail } from '../utils/errorChecks'
import { reduceFormSpecs } from '../utils/forms'

const TICKET_INPUT_SPECS: FormSpecs<TicketInput> = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    defaultValue: '',
    required: true,
    validation: (name) => areValidStrings({ name }),
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    defaultValue: '',
    required: true,
    validation: (email) => isValidEmail(email),
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    defaultValue: '',
    required: true,
    validation: (description) => areValidStrings({ description }),
    props: { as: 'textarea', style: { height: '8em' } },
  },
]

const DEFAULT_INPUT_STATE = reduceFormSpecs(TICKET_INPUT_SPECS)
const DEFAULT_ERROR_STATE = reduceFormSpecs<TicketInput, string | null>(
  TICKET_INPUT_SPECS,
  null
)

const TicketSubmissionPage = () => {
  const [ticketInput, setTicketInput] = useState(DEFAULT_INPUT_STATE)
  const [inputErrors, setInputErrors] = useState(DEFAULT_ERROR_STATE)

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (ev) => {
      ev.preventDefault()

      // validate inputs
      let numErrors = 0
      setInputErrors(DEFAULT_ERROR_STATE)
      for (const spec of TICKET_INPUT_SPECS)
        try {
          spec.validation(ticketInput[spec.key])
        } catch (err) {
          setInputErrors((prev) => ({
            ...prev,
            [spec.key]: `${spec.label} is invalid.`,
          }))
          numErrors++
        }

      // submit ticket to server if there are no errors
      if (numErrors === 0) {
        const trimmedInputs: TicketInput = Object.entries(ticketInput).reduce(
          (p, [k, v]) => ({ ...p, [k]: v.trim() }),
          {} as TicketInput
        )
        submitTicket(trimmedInputs)
          .then(({ data }) =>
            console.log(
              `Ticket creation confirmation email sent to ${data.email} with the following details:`,
              data
            )
          )
          .catch(({ response }) =>
            console.error('ticket submission error', response)
          )
      }
    },
    [ticketInput]
  )

  const onInputChange = useCallback(
    (key: keyof TicketInput, value: any) =>
      setTicketInput((prev) => ({ ...prev, [key]: value })),
    []
  )

  return (
    <div className={styles.container}>
      <h1 className="mb-5">Submit your ticket</h1>

      <Form onSubmit={onFormSubmit}>
        {TICKET_INPUT_SPECS.map((e) => (
          <Form.Group className={styles.formGroup} key={e.key}>
            <FloatingLabel label={e.label} controlId={e.key}>
              <Form.Control
                {...e.props}
                value={ticketInput[e.key]}
                type={e.type}
                onChange={(ev) => onInputChange(e.key, ev.target.value)}
                placeholder=""
                required={e.required}
              />
            </FloatingLabel>

            {inputErrors[e.key] && (
              <span className="field-error">{inputErrors[e.key]}</span>
            )}
          </Form.Group>
        ))}

        <Button className="mt-4" size="lg" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default TicketSubmissionPage
