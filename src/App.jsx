import { Footer, Navbar } from "./components"
import { ProfilePage, HomePage, LoginPage, NotFoundPage, RegisterPage } from "./pages/"
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./utils/ProtectedRoute"

function App() {
  //TODO: first check if there is a cookie contain a taoken , 
  //TODO: then  call isauth endpoint , and check of the token 
  return (
    <div className="">
      <Navbar />
      {console.log('in app')}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
export default App
