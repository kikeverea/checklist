import FormInput from './FormInput'
import { useField } from 'formik'

const FormikTextInput = ({ name, label, isPassword }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <>
      <FormInput
        name={ name }
        label={ label }
        value={ field.value }
        isPassword={ isPassword }
        setValue={ helpers.setValue }
        setBlur={ helpers.setTouched }
        error={ showError ? meta.error : null }
      />
    </>
  )
}

export default FormikTextInput