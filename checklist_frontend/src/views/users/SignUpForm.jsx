import { StyleSheet } from 'react-native'
import { View, Button } from 'react-native'
import FormikTextInput from '../../components/input/FormikTextInput'
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
      {({ handleSubmit }) =>
      (
        <View style={ styles.formContainer }>
          <FormikTextInput
            name='name'
            label='Nombre'
          />
          <FormikTextInput
            name='username'
            label='Usuario'
          />
          <FormikTextInput
            name='email'
            label='Correo Electrónico'
          />
          <FormikTextInput
            name='password'
            label='Contraseña'
            isPassword={ true }
          />
          <FormikTextInput
            name='confirmPassword'
            label='Repetir Contraseña'
            isPassword={ true }
          />
          <Button color={ colors.primary } onPress={ handleSubmit } title="CREAR CUENTA" />
        </View>
      )}
      </Formik>
  )
}  

export default SignUpForm