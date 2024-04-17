import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

import css from '../Contact/Contact.module.css';

const Contact = ({ contact: { id, name, phone } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.contactContainer}>
      <ul className={css.contactInfo}>
        <li>{name}</li>
        <li>{phone}</li>
      </ul>
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
