import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import {
  loginAPI, registerAPI, loginUserWithGoogleAPI,
  registerUserWithGoogleAPI, logoutAPI, isAuthAPI,
  sendResetPasswordOTPAPI, resetPasswordAPI,
  sendVerifyUserOTPAPI, verifyUserAPI
} from '../../api/auth/auth';


const initialState = {
  user: null,
  error: null,
  message: null,
  isLoading: false,
}


const login = createAsyncThunk('authSlice/login', async ({ email, password }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await loginAPI(email, password);
    return data
  } catch (error) {
    return rejectWithValue(error.message);
  }
})

const loginWithGoogle = createAsyncThunk('authSlice/loginWithGoogle', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const { data } = await loginUserWithGoogleAPI(user.accessToken);
    return data;
  } catch (err) { return rejectWithValue(err.message); }
})

const register = createAsyncThunk('authSlice/register', async ({ username, email, password }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await registerAPI(username, email, password);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }

})

const registerWithGoogle = createAsyncThunk('authSlice/registerWithGoogle', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const { data } = await registerUserWithGoogleAPI(user.accessToken);
    return data;
  } catch (error) { return rejectWithValue(error.message); }
})

const logout = createAsyncThunk('authSlice/logout', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await logoutAPI();
    return data;
  } catch (error) { return rejectWithValue(error.message) }
})
const isAuth = createAsyncThunk('authSlice/isAuth', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await isAuthAPI();
    return data;
  } catch (error) { return rejectWithValue(error.message) }
})

//! ForgotPassword Feature
const sendResetPasswordOTP = createAsyncThunk('authSlice/sendResetPasswordOTP', async ({ email }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    console.log('in sendResetPasswordOTP thunk ', email);
    const { data } = await sendResetPasswordOTPAPI(email);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message)
  }
})

const resetPassword = createAsyncThunk('authSlice/resetPassword', async ({ email, OTP, newPassword }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await resetPasswordAPI(email, OTP, newPassword);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message)
  }

})

//! VerifyUser Feature 
const sendVerifyUserOTP = createAsyncThunk('authSlice/sendVerifyUserOTP', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await sendVerifyUserOTPAPI();
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message)
  }
})

const verifyUser = createAsyncThunk('authSlice/verifyUser', async ({ OTP }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await verifyUserAPI(OTP);
    return data;
  } catch (error) { return rejectWithValue(error.message) }
})

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    reset: (state) => {
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

      // logout 
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        state.err = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // isAuth 
      .addCase(isAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(isAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        state.error = payload;
      })

      // sendResetPasswordOTP 
      .addCase(sendResetPasswordOTP.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(sendResetPasswordOTP.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      })
      .addCase(sendResetPasswordOTP.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = null;
        state.error = payload;
      })

      // resetPassword 
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = null;
        state.error = payload;
      })

      // sendVerifyUserOTP 
      .addCase(sendVerifyUserOTP.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(sendVerifyUserOTP.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      })
      .addCase(sendVerifyUserOTP.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = null;
        state.error = payload;
      })

      // verifyUser 
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      })
      .addCase(verifyUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = null;
        state.error = payload;
      })
  }
})

export default authSlice.reducer;
export const { reset } = authSlice.actions;
export {
  login, register, loginWithGoogle, registerWithGoogle,
  logout, isAuth, sendResetPasswordOTP, resetPassword,
  verifyUser, sendVerifyUserOTP
};
