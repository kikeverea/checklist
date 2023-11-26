import { render, screen } from '@testing-library/react-native'
import LoginForm from '../../../src/views/users/LoginForm'

describe('Greeting', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('renders a greeting message based on the name prop', () => {
    render(<LoginForm />)

    expect(screen.getAllByText('Usuario')).toBeDefined()
    expect(screen.getAllByText('Contraseña')).toBeDefined()
    expect(screen.getByText('LOG IN')).toBeDefined()
  })
})


// describe('Login', () => {
  // jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  //   OS: 'android',
  //   select: () => null 
  // }))

//   it('renders login form', () => {
  
//     render(<Login />)

    // expect(screen.getByPlaceholderText('Usuario')).toBeDefined()
    // expect(screen.getByLabelText('Usuario')).toBeDefined()
    // expect(screen.getByPlaceholderText('Contraseña')).toBeDefined()
    // expect(screen.getByLabelText('Contraseña')).toBeDefined()
//   })
// })