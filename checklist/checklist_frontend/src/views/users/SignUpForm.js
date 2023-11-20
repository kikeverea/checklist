import { StyleSheet } from 'react-native'
import { View, Button } from 'react-native'
import FormInput from '../input/FormInput'
import { Formik } from 'formik'
import { colors } from '../../styles/styles'

const SignUpForm = ({ onSubmit }) => {

  const styles = StyleSheet.create({
    formContainer: {
      gap: 16
    }
  })

  return (
      <Formik
        initialValues={{ name: '', username: '', email: '', password: '', confirmPassword: ''  }}
        onSubmit={values => onSubmit(values)}
      >
      {({ handleChange, handleSubmit, values }) =>
      (
        <View style={ styles.formContainer }>
          <FormInput
            name='name'
            label='Nombre'
            value={values.name}
            handleChange={ handleChange }
          />
          <FormInput
            name='username'
            label='Usuario'
            value={values.username}
            handleChange={ handleChange }
          />
          <FormInput
            name='email'
            label='Correo Electrónico'
            value={values.email}
            handleChange={ handleChange }
          />
          <FormInput
            name='password'
            label='Contraseña'
            value={values.password}
            isPassword={ true }
            handleChange={ handleChange }
          />
          <FormInput
            name='confirmPassword'
            label='Confirmar Contraseña'
            value={values.confirmPassword}
            isPassword={ true }
            handleChange={ handleChange }
          />
          <Button color={ colors.primary } onPress={handleSubmit} title="CREAR CUENTA" />
        </View>
      )}
      </Formik>
  )
}  

export default SignUpForm