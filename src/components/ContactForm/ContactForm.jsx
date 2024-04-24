import { useId, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import clsx from 'clsx';

import { addContact } from '../../redux/contacts/operations';
import {
  contactValidationSchema,
  contactsFormInitValues,
} from '../../redux/constants';

import css from '../ContactForm/ContactForm.module.css';

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const nameFieldRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = (values, form) => {
    dispatch(addContact(values));
    form.resetForm();
    nameFieldRef.current.focus();
  };

  return (
    <Formik
      initialValues={contactsFormInitValues}
      validationSchema={contactValidationSchema}
      onSubmit={handleSubmit}>
      {(formikData) => {
        return (
          <Form className={css.formContainer}>
            <div className={css.fieldContainer}>
              <label className={css.labelText} htmlFor={nameFieldId}>
                Name
              </label>
              <Field
                innerRef={nameFieldRef}
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
              <label className={css.labelText} htmlFor={numberFieldId}>
                Phone
              </label>
              <Field
                type="tel"
                name="number"
                id={numberFieldId}
                className={clsx(
                  css.formInput,
                  formikData.touched.number &&
                    formikData.errors.number &&
                    css.formInputError
                )}
              />
              <ErrorMessage
                name="number"
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
