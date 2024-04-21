import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import {
  loginFormInitValues,
  loginValidationSchema,
} from '../../redux/constants';
import { login } from '../../redux/auth/operations';
import css from '../ContactForm/ContactForm.module.css';

const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, form) => {
    dispatch(login(values));
    form.resetForm();
  };

  return (
    <Formik
      initialValues={loginFormInitValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}>
      {(formikData) => {
        return (
          <Form className={css.formContainer}>
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
            <button type="submit">Log in</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
