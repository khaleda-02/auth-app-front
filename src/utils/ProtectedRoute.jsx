import { useSelector } from 'react-redux';
import { UnauthorizedPage } from "../pages";

const ProtectedRoute = ({ children }) => {
  //! send to isauth endpoint 
  const { user } = useSelector(state => state.auth)
  if (!user) {
    return (<UnauthorizedPage />)
  } else {
    return children
  }
}

export default ProtectedRoute