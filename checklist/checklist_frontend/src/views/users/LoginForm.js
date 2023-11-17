import { Formik } from "formik"
import { View, Button, StyleSheet } from "react-native"
import FormInput from "../input/FormInput"
import { colors } from "../../styles/styles"

const LoginForm = ({ onSubmit }) => {

  const styles = StyleSheet.create({
    formContainer: {
      gap: 16
    }
  })

  return (
    <Formik
    initialValues={{ user: '' }}
    onSubmit={values => onSubmit(values)}
    >
      {({ handleChange, handleSubmit, values }) =>
      (
        <View style={ styles.formContainer }>
          <FormInput
            name='user'
            label='Usuario'
            value={values.user}
            handleChange={ handleChange }
          />
          <FormInput
            name='password'
            label='Contraseña'
            value={values.password}
            isPassword={ true }
            handleChange={ handleChange }
          />
          <Button color={ colors.primary } onPress={handleSubmit} title="LOG IN" />
        </View>
      )}
    </Formik>
  )
}

export default LoginForm