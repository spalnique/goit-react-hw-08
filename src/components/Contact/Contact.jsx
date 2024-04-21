import { useDispatch } from 'react-redux';

import css from '../Contact/Contact.module.css';
import { openModal, onEditOpen, onDeleteOpen } from '../../redux/modal/slice';
// import { toggleIsDeleting, toggleIsEditing } from '../../redux/contacts/slice';

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    // dispatch(openModal({ id, name, number }));
    // dispatch(toggleIsEditing());
    dispatch(onEditOpen({ id, name, number, type: 'edit' }));
  };

  const handleDelete = () => {
    // dispatch(openModal({ id, name, number }));
    // dispatch(toggleIsDeleting());
    dispatch(onDeleteOpen({ id, name, number, type: 'delete' }));
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
        onClick={handleEdit}>
        edit
      </button>
      <button
        className={css.contactRemoveButton}
        type="button"
        onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default Contact;
