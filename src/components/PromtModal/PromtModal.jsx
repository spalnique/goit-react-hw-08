import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/auth/operations';
import { deleteContact } from '../../redux/contacts/operations.js';
import { onClose, selectModalData } from '../../redux/modal/slice';
import { actionType } from '../../redux/constants';

import css from './PromtModal.module.css';

const { actionDelete, actionLogout } = actionType;

const PromtModal = ({ action }) => {
  const dispatch = useDispatch();
  const contact = useSelector(selectModalData);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCancel = () => {
    dispatch(onClose());
  };

  switch (action) {
    case actionDelete: {
      return (
        <>
          <div className={css.textWrapper}>
            <span>Are you sure to delete this contact?</span>
            <span className={css.importantText}>{contact.name}</span>
          </div>
          <div className={css.buttonsWrapper}>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </>
      );
    }
    case actionLogout:
      return (
        <>
          <span className={css.importantText}>Are you sure to log out?</span>
          <div className={css.buttonsWrapper}>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </>
      );
    default:
      return null;
  }
};

export default PromtModal;
