import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';
import { formikInitValues, validationSchema } from '../../redux/constants';
import { addContact } from '../../redux/contactsOps';

import css from '../ContactForm/ContactForm.module.css';

const ContactForm = () => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, form) => {
    dispatch(addContact(values));
    form.resetForm();
    document.querySelector('input[name="name"]').focus(); // я не придумав, як у компонент Field форміка
  };

  return (
    <Formik
      initialValues={formikInitValues}
      validationSchema={validationSchema}
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
                  formikData.touched.username &&
                    formikData.errors.username &&
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
              <label className={css.labelText} htmlFor={phoneFieldId}>
                Phone
              </label>
              <Field
                type="tel"
                name="phone"
                id={phoneFieldId}
                className={clsx(
                  css.formInput,
                  formikData.touched.phone &&
                    formikData.errors.phone &&
                    css.formInputError
                )}
              />
              <ErrorMessage
                name="phone"
                component="p"
                className={css.errorMessage}
              />
            </div>
            <button type="submit">Add contact</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
