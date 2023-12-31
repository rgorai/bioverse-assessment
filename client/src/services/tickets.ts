import axios from 'axios'

export const submitTicket = (ticketInput: TicketInput) =>
  axios.post<ApiTicket>('/api/tickets', ticketInput)

export const getAllTickets = () => axios.get<ApiTicket[]>('/api/tickets')

export const getTicketDetails = (ticketId: string) =>
  axios.get<ApiTicket>(`/api/tickets/${ticketId}`)

export const sendTicketResponse = (ticketId: string, message: string) =>
  axios.put<string>(`/api/tickets/${ticketId}/message`, { message })

export const updateTicketStatus = (ticketId: string, newStatus: ApiStatus) =>
  axios.put<ApiTicket>(`/api/tickets/${ticketId}/status`, { newStatus })
