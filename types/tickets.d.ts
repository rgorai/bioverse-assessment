/**
 * @author rgorai
 * @description a post to a user's feed
 * @param _id the id of the ticket
 * @param name the name / title of the ticket
 * @param email the email of the ticket's creator
 * @param description the description of the ticket details
 * @param status the current status of the ticket
 * @param createdDate the ISO-8601 string of when the ticket was created
 * @param updatedDate the ISO-8601 string of when the ticket was updated
 */
type Ticket = {
  _id: string
  name: string
  email: string
  description: string
  status: Status
  createdDate: string
  updatedDate: string
}

/**
 * @author rgorai
 * @description the information required to create a ticket
 */
type TicketInput = Pick<Ticket, 'name' | 'email' | 'description'>

/**
 * @author rgorai
 * @description the different types of ticket statuses
 */
type Status = 'New' | 'In Progress' | 'Resolved'
