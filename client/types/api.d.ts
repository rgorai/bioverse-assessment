/**
 * @author rgorai
 * @description the stored details of a ticket
 * @param _id the id of the ticket
 * @param name the name of the ticket's creator
 * @param email the email of the ticket's creator
 * @param description the description of the ticket details
 * @param status the current status of the ticket
 * @param createdDate the ISO-8601 string of when the ticket was created
 * @param updatedDate the ISO-8601 string of when the ticket was updated
 */
type ApiTicket = {
  _id: string
  name: string
  email: string
  description: string
  status: ApiStatus
  createdDate: string
  updatedDate: string
}

/**
 * @author rgorai
 * @description the information required to create a ticket
 */
type TicketInput = Pick<ApiTicket, 'name' | 'email' | 'description'>

/**
 * @author rgorai
 * @description the different types of ticket statuses, represented as numbers
 */
type ApiStatus = 0 | 1 | 2
