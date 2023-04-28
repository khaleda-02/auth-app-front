import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, loginUserWithGoogle, registerUserWithGoogle } from '../../api/auth/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'

// get the user from localstorge 
const user = JSON.parse(localStorage.getItem('user')) || null;
console.log(user)
const initialState = {
  user,
  error: null,
  isLoading: false,
}

const login = createAsyncThunk('authSlice/login', async ({ email, password }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    //! we should put await , explained in lginUser file .
    const { data } = await loginUser(email, password);
    localStorage.setItem("user", JSON.stringify(data));
    return data
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

const loginWithGoogle = createAsyncThunk('authSlice/loginWithGoogle', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const { data } = await loginUserWithGoogle(user.accessToken);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (err) { return rejectWithValue(err.message); }
})

const register = createAsyncThunk('authSlice/register', async ({ username, email, password }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await registerUser(username, email, password);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }

})

const registerWithGoogle = createAsyncThunk('authSlice/registerWithGoogle', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const { data } = await registerUserWithGoogle(user.accessToken);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (err) { return rejectWithValue(err.message); }
})

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.isLoading = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      //Login 
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.user = null;
      })

      //Login with google 
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(loginWithGoogle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.user = null;
      })

      //regiser
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.user = null;
      })

      //registerWithGoogle with google 
      .addCase(registerWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.user = null;
      })
      .addCase(registerWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(registerWithGoogle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.user = null;
      })
  }
})

export default authSlice.reducer;
export const { logOut } = authSlice.actions;
export { login, register, loginWithGoogle, registerWithGoogle };
