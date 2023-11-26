import { StyleSheet } from 'react-native'
import { View, Button } from 'react-native'
import FormInput from '../input/FormInput'
import { Formik } from 'formik'
import { colors } from '../../styles/styles'
import * as Yup from 'yup'

const SignUpForm = ({ onSubmit }) => {

  const styles = StyleSheet.create({
    formContainer: {
      gap: 16
    }
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Min. 3 caracteres'),
    username: Yup
      .string()
      .min(3, 'Min. 3 caracteres')
      .required('Campo requerido'),
    email: Yup
      .string()
      .email('Formato incorrecto')
      .required('Campo requerido'),
    password: Yup
      .string()
      .min(6, 'Min. 6 caracteres')
      .required('Campo requerido'),
    confirmPassword: Yup
      .string()
      .min(6, 'Min. 6 caracteres')
      .required('Campo requerido')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  });

  return (
      <Formik
        initialValues={{ name: '', username: '', email: '', password: '', confirmPassword: ''  }}
        validationSchema={ validationSchema }
        onSubmit={values => onSubmit(values)}
      >
      {({ handleChange, handleSubmit, values, errors }) =>
      (
        <View style={ styles.formContainer }>
          <FormInput
            name='name'
            label='Nombre'
            value={values.name}
            handleChange={ handleChange }
            error={ errors.name }
          />
          <FormInput
            name='username'
            label='Usuario'
            value={values.username}
            handleChange={ handleChange }
            error={ errors.username }
          />
          <FormInput
            name='email'
            label='Correo Electrónico'
            value={values.email}
            handleChange={ handleChange }
            error={ errors.email }
          />
          <FormInput
            name='password'
            label='Contraseña'
            value={values.password}
            isPassword={ true }
            handleChange={ handleChange }
            error={ errors.password }
          />
          <FormInput
            name='confirmPassword'
            label='Repetir Contraseña'
            value={values.confirmPassword}
            error={ errors.confirmPassword }
            isPassword={ true }
            handleChange={ handleChange }
          />
          <Button color={ colors.primary } onPress={ handleSubmit } title="CREAR CUENTA" />
        </View>
      )}
      </Formik>
  )
}  

export default SignUpForm