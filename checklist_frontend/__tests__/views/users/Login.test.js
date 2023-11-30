import { render, fireEvent, waitFor, screen } from '@testing-library/react-native'
import LoginForm from '../../../src/views/users/LoginForm'
import { act } from 'react-test-renderer'
import usersService from '../../../src/services/usersService'

jest.mock('react-router-native', () => ({
    ...jest.requireActual('react-router-native'),
  useNavigate: () => jest.fn()
}))

describe('Log in form', () => {

  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('renders log-in form', async () => {
    render(<LoginForm />)

    expect(screen.getAllByText('Usuario')).toBeDefined()
    expect(screen.getAllByText('Contraseña')).toBeDefined()
    expect(screen.getByText('INICIAR SESION')).toBeDefined()
    expect(screen.getByRole('button', { name: 'INICIAR SESION' })).toBeDefined()
  })

  it('produces login values on submit ', async () => {
    const onSubmit = jest.fn()

    render(<LoginForm onSubmit={ onSubmit }/>)

    const expected = {
      username: 'user',
      password: 'asdasd'
    }
    
    // wrap in an async act to make it compatible with Formik
    await act(() => {
      fireEvent.changeText(screen.getByTestId('form-input-username'), expected.username)
      fireEvent.changeText(screen.getByTestId('form-input-password'), expected.password)
    })

    // wrap in an async act to make it compatible with Formik
    await act(() => {
      fireEvent.press(screen.getByRole('button', { name: 'INICIAR SESION' }))
    })

    // wrap in an async waitFor to wait for Formik to call the onSubmit function
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenCalledWith(expected)
    })
  })
})

describe('Login service', () => {
  it('returns success status and user data when login in successfully', async () => {
    const credentials = {
      username: 'user2',
      password: 'asdasd'
    }

    const { success, data } = await usersService.loginUser(credentials.username, credentials.password)
    const user = data.user

    expect(success).toBe(true)
    expect(user.name).toBe('Elsa Pato')
    expect(user.username).toBe('user2')
    expect(data.token).toBeDefined()

  })

  it('returns fail status and error message when login in fails', async () => {
    const credentials = {
      username: 'fake_user',
      password: 'no_pass'
    }

    const { success, data } = await usersService.loginUser(credentials.username, credentials.password)

    expect(success).toBe(false)
    expect(data.user).not.toBeDefined()
    expect(data.token).not.toBeDefined()
  })
})