import { render, fireEvent, waitFor, screen } from '@testing-library/react-native'
import SignUpForm from '../../../src/views/users/SignUpForm'
import { act } from 'react-test-renderer'

jest.mock('react-router-native', () => ({
    ...jest.requireActual('react-router-native'),
  useNavigate: () => jest.fn()
}))

describe('Sign up', () => {

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('renders sign-up form', () => {
    render(<SignUpForm />)

    expect(screen.getAllByText('Nombre')).toBeDefined()
    expect(screen.getAllByText('Usuario')).toBeDefined()
    expect(screen.getAllByText('Correo Electrónico')).toBeDefined()
    expect(screen.getAllByText('Contraseña')).toBeDefined()
    expect(screen.getAllByText('Repetir Contraseña')).toBeDefined()
    expect(screen.getByText('CREAR CUENTA')).toBeDefined()
    expect(screen.getByRole('button', { name: 'CREAR CUENTA' })).toBeDefined()
  })

  it('on form submit produces correct values', async () => {
    const onSubmit = jest.fn()

    render(<SignUpForm onSubmit={ onSubmit }/>)

    const expected = {
      name: 'Nombre',
      username: 'Usuario',
      email: 'nombre@mail.com',
      password: 'asdasd',
      confirmPassword: 'asdasd'
    }
    
    // wrap in an async act to make it compatible with Formik
    await act(() => {
      fireEvent.changeText(screen.getByTestId('form-input-name'), expected.name)
      fireEvent.changeText(screen.getByTestId('form-input-username'), expected.username)
      fireEvent.changeText(screen.getByTestId('form-input-email'), expected.email)
      fireEvent.changeText(screen.getByTestId('form-input-password'), expected.password)
      fireEvent.changeText(screen.getByTestId('form-input-confirmPassword'), expected.confirmPassword)
    })

    // wrap in an async act to make it compatible with Formik
    await act(() => {
      fireEvent.press(screen.getByRole('button', { name: 'CREAR CUENTA' }))
    })

    // wrap in an async waitFor to wait for Formik to call the onSubmit function
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(expected)
    })
  })
})