import { Formik } from "formik"
import { View, Button, StyleSheet } from "react-native"
import FormikTextInput from '../../components/input/FormikTextInput'
import { colors } from "../../styles/styles"

const LoginForm = ({ onSubmit }) => {

  const styles = StyleSheet.create({
    formContainer: {
      gap: 16
    }
  }) 

  return (
    <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={values => onSubmit(values)}
    >
      {({ handleSubmit }) =>
      (
        <View style={ styles.formContainer }>
          <FormikTextInput
            name='username'
            label='Usuario'
          />
          <FormikTextInput
            name='password'
            label='Contraseña'
            isPassword={ true }
          />
          <Button color={ colors.primary } onPress={handleSubmit} title="INICIAR SESION" />
        </View>
      )}
    </Formik>
  )
}

export default LoginForm