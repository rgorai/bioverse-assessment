import Container from 'react-bootstrap/esm/Container'
import Nav from 'react-bootstrap/esm/Nav'
import Navbar from 'react-bootstrap/esm/Navbar'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import TicketSubmissionPage from './Components/TicketSubmissionPage'
import TicketsPage from './Components/TicketsPage'

const APP_SPECS: AppSpecs = [
  {
    label: 'Ticket Submission',
    path: '/',
    element: <TicketSubmissionPage />,
    showOnNavbar: true,
  },
  {
    label: 'Admin Panel',
    path: '/tickets',
    element: <TicketsPage />,
    showOnNavbar: true,
  },
  {
    label: 'Ticket Details',
    path: '/tickets/:ticketId',
    element: <>ticket details</>,
  },
]

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Bioverse Ticket Management System
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="me-auto justify-content-end">
                {APP_SPECS.filter((e) => e.showOnNavbar).map((e) => (
                  <Nav.Link as={Link} to={e.path} key={e.path}>
                    {e.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main>
          <Routes>
            {APP_SPECS.map((e) => (
              <Route path={e.path} element={e.element} key={e.path} />
            ))}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
