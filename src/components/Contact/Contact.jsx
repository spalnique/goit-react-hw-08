import { useDispatch } from 'react-redux';

import css from '../Contact/Contact.module.css';
import { openModal } from '../../redux/modal/slice';
import { toggleIsDeleting, toggleIsEditing } from '../../redux/contacts/slice';

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(openModal({ id, name, number }));
    dispatch(toggleIsDeleting());
  };

  const handleEdit = () => {
    dispatch(openModal({ id, name, number }));
    dispatch(toggleIsEditing());
  };

  return (
    <div className={css.contactContainer}>
      <ul className={css.contactInfo}>
        <li>{name}</li>
        <li>{number}</li>
      </ul>
      <button
        className={css.contactRemoveButton}
        type="button"
        onClick={() => {
          handleEdit();
          // dispatch(onEditOpen({ id, name, number }));
        }}>
        edit
      </button>
      <button
        className={css.contactRemoveButton}
        type="button"
        onClick={() => {
          handleDelete();
          // dispatch(onDeleteOpen({ id, name, number }));
        }}>
        delete
      </button>
    </div>
  );
};

export default Contact;
