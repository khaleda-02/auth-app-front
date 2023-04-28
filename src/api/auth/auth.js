import api from '../client'

const loginUser = async (email, password) => {
  //! the await is for waiting the res from the request .
  return await api.post('/api/auth/login', { email, password })
  //! it will return a promise . that contains the case (fulfilled , , ) and the data , and we need to hadnle the promise with await in the slice .
}
const loginUserWithGoogle = async (accessToken) => {
  return await api.post('/api/auth/login', { googleToken: accessToken })
}

const registerUser = async (username, email, password) => {
  return await api.post('/api/auth/register', { username, email, password })
}
const registerUserWithGoogle = async (accessToken) => {
  return await api.post('/api/auth/register', { googleToken: accessToken })
}

export { loginUser, registerUser, loginUserWithGoogle, registerUserWithGoogle }