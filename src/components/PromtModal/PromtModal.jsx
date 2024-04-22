import { useDispatch, useSelector } from 'react-redux';

import { deleteContact } from '../../redux/contacts/operations';
import { logout } from '../../redux/auth/operations';
import { onClose, selectModalData } from '../../redux/modal/slice';

import css from './PromtModal.module.css';

const PromtModal = ({ actionType }) => {
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

  switch (actionType) {
    case 'delete': {
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
    case 'logout':
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
