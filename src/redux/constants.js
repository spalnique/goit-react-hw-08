import * as Yup from 'yup';
import storage from 'redux-persist/lib/storage';

export const baseURL = 'https://connections-api.herokuapp.com';
export const axiosParams = { baseURL, headers: { Authorization: ''}}
export const appInitState = {
  auth: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoading: false,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filters: {
    name: '',
  },
  modal: { isOpen: false, data: {}, actionType: null },
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

export const registerValidationSchema = Yup.object().shape({
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

export const loginValidationSchema = Yup.object().shape({
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

export const registerFormInitValues = {
  name: '',
  email: '',
  password: '',
};

export const loginFormInitValues = {
  email: '',
  password: '',
};

export const actionType = {
  actionEdit: 'edit',
  actionDelete: 'delete',
  actionLogout: 'logout',
};
