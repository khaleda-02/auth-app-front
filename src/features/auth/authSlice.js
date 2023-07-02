import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionCodeURL, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase';
import Cookies from "js-cookie";
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
    return rejectWithValue(error.response.data.message || error.message);
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
    return rejectWithValue(error.response.data.message || error.message);
  }

})

const registerWithGoogle = createAsyncThunk('authSlice/registerWithGoogle', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
    const { data } = await registerUserWithGoogleAPI(user.accessToken);
    return data;
  } catch (error) { return rejectWithValue(error.response.data.message || error.message); }
})

const logout = createAsyncThunk('authSlice/logout', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await logoutAPI();
    return data;
  } catch (error) { return rejectWithValue(error.response.data.message || error.message) }
})
const isAuth = createAsyncThunk('authSlice/isAuth', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await isAuthAPI();
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message)
  }
})

//! ForgotPassword Feature
const sendResetPasswordOTP = createAsyncThunk('authSlice/sendResetPasswordOTP', async ({ email }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await sendResetPasswordOTPAPI(email);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message)
  }
})

const resetPassword = createAsyncThunk('authSlice/resetPassword', async ({ email, OTP, newPassword }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await resetPasswordAPI(email, OTP, newPassword);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message)
  }

})

//! VerifyUser Feature 
const sendVerifyUserOTP = createAsyncThunk('authSlice/sendVerifyUserOTP', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await sendVerifyUserOTPAPI();
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message)
  }
})

const verifyUser = createAsyncThunk('authSlice/verifyUser', async ({ OTP }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { data } = await verifyUserAPI(OTP);
    return data;
  } catch (error) { return rejectWithValue(error.response.data.message || error.message) }
})

//! action's handlers : 
const handleAuthAction = (builder, action) => {
  builder
    .addCase(action.pending, (state) => {
      state.isLoading = true;
      state.message = "loading";
    })
    .addCase(action.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      state.user = payload.data;
      Cookies.set('token', payload.data.token, { expires: 7, path: '/' });
    })
    .addCase(action.rejected, (state, { payload }) => {
      state.user = null;
      state.isLoading = false;
      state.error = payload;
      state.message = payload;
    })
}
const handleUserAction = (builder, action) => {
  builder
    .addCase(action.pending, (state) => {
      state.isLoading = true;
      state.message = "loading";
    })
    .addCase(action.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    })
    .addCase(action.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.error = payload;
    })
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.message = null;
    }
  },

  extraReducers: (builder) => {
    //! Auth
    handleAuthAction(builder, login);
    handleAuthAction(builder, loginWithGoogle);
    handleAuthAction(builder, register);
    handleAuthAction(builder, registerWithGoogle);
    //! ForgotPassword
    handleUserAction(builder, sendResetPasswordOTP);
    handleUserAction(builder, resetPassword);
    //! UserVerificatoin
    handleUserAction(builder, sendVerifyUserOTP);
    handleUserAction(builder, verifyUser);

    builder
      //! logout 
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.message = "loading";
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        Cookies.remove('token', { path: '/' });
        state.isLoading = false;
        state.user = null;
        state.err = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      //! isAuth 
      .addCase(isAuth.pending, (state) => {
        state.message = "loading";
        state.isLoading = true;
      })
      .addCase(isAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(isAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        Cookies.remove('token', { path: '/' });
        state.user = null;
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
