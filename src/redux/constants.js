import * as Yup from 'yup';

export const appInitState = {
  contacts: {
    items: [],
    loading: true,
    error: null,
  },
  filters: {
    name: '',
  },
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Username is too short!')
    .max(50, 'Username is too long!')
    .required('Required'),
  phone: Yup.string()
    .min(3, 'Phone number is too short!')
    .max(50, 'Phone number is too long!')
    .required('Required'),
});

export const formikInitValues = {
  name: '',
  phone: '',
};
