import * as Yup from 'yup';
import storage from 'redux-persist/lib/storage';

export const appInitState = {
  auth: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoading: false,
    isLoggedIn: false,
    isLoggingOut: false,
    isRefreshing: false,
    error: null,
  },
  contacts: {
    items: [],
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    error: null,
  },
  filters: {
    name: '',
  },
  modal: { isOpen: false, data: {} },
};

export const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const contactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Username is too short!')
    .max(50, 'Username is too long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Phone number is too short!')
    .max(50, 'Phone number is too long!')
    .required('Required'),
});
export const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Username is too short!')
    .max(16, 'Username is too long!')
    .required('Required'),
  email: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short!')
    .max(64, 'Password is too long!')
    .required('Required'),
});
export const signinValidationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short!')
    .max(64, 'Password is too long!')
    .required('Required'),
});

export const contactsFormInitValues = {
  name: '',
  number: '',
};
export const signUpFormInitValues = {
  name: '',
  email: '',
  password: '',
};
export const signInFormInitValues = {
  email: '',
  password: '',
};
