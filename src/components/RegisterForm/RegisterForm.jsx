import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import {
  signUpFormInitValues,
  signupValidationSchema,
} from '../../redux/constants';
import { signup } from '../../redux/auth/operations';
import css from '../ContactForm/ContactForm.module.css';

const RegisterForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, form) => {
    dispatch(signup(values));
    form.resetForm();
  };

  return (
    <Formik
      initialValues={signUpFormInitValues}
      validationSchema={signupValidationSchema}
      onSubmit={handleSubmit}>
      {(formikData) => {
        return (
          <Form className={css.formContainer}>
            <div className={css.fieldContainer}>
              <label className={css.labelText} htmlFor={nameFieldId}>
                Name
              </label>
              <Field
                type="text"
                name="name"
                id={nameFieldId}
                className={clsx(
                  css.formInput,
                  formikData.touched.name &&
                    formikData.errors.name &&
                    css.formInputError
                )}
              />
              <ErrorMessage
                name="name"
                component="p"
                className={css.errorMessage}
              />
            </div>
            <div className={css.fieldContainer}>
              <label className={css.labelText} htmlFor={emailFieldId}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                id={emailFieldId}
                className={clsx(
                  css.formInput,
                  formikData.touched.email &&
                    formikData.errors.email &&
                    css.formInputError
                )}
              />
              <ErrorMessage
                name="email"
                component="p"
                className={css.errorMessage}
              />
            </div>
            <div className={css.fieldContainer}>
              <label className={css.labelText} htmlFor={passwordFieldId}>
                Password
              </label>
              <Field
                type="password"
                name="password"
                id={passwordFieldId}
                className={clsx(
                  css.formInput,
                  formikData.touched.password &&
                    formikData.errors.password &&
                    css.formInputError
                )}
              />
              <ErrorMessage
                name="password"
                component="p"
                className={css.errorMessage}
              />
            </div>
            <button type="submit">Register</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
