import { useNavigate } from "react-router-native"
import IconButton from "./IconButton"

const BackButton = () => {

  const navigate = useNavigate()

  return <IconButton name='arrow-left' onPress={ () => navigate(-1) } />
}

export default BackButton