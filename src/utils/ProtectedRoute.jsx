import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { UnauthorizedPage } from "../pages";
import { isAuth } from '../features/auth/authSlice'

const ProtectedRoute = ({ children }) => {  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuth())
  }, [])

  const { user, isLoading } = useSelector(state => state.auth)
  if (isLoading) {
    return <h1>loading....</h1>
  } else if (!user) {
    return (<UnauthorizedPage />)
  } else {
    return children
  }
}

export default ProtectedRoute