import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Routes, Route } from 'react-router-dom'
import { isAuth } from './features/auth/authSlice'
import { Footer, Navbar } from "./components"
import { ProfilePage, HomePage, LoginPage, NotFoundPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, VerifyUserPage } from "./pages"
import ProtectedRoute from "./utils/ProtectedRoute"

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuth());
  }, [])

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/verify' element={<VerifyUserPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/forgot-password/:email/reset' element={<ResetPasswordPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App
