import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import clsx from 'clsx';

import { updateContact } from '../../redux/contacts/operations';
import { onClose } from '../../redux/modal/slice';
import { selectModalData } from '../../redux/modal/selectors';
import { contactValidationSchema } from '../../redux/constants';

import css from './EditForm.module.css';

const EditForm = () => {
  const dispatch = useDispatch();

  const { id, name, number } = useSelector(selectModalData);
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values) => {
    dispatch(updateContact({ id, ...values }));
  };

  const handleSubmitCancel = () => {
    dispatch(onClose());
  };

  return (
    <Formik
      initialValues={{ name, number }}
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
            <div className={css.buttonsWrapper}>
              <button type="submit">Save changes</button>
              <button type="button" onClick={handleSubmitCancel}>
                Cancel
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditForm;
