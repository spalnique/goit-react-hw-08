import { useDispatch } from 'react-redux';
import { onOpen } from '../../redux/modal/slice';

import css from '../Contact/Contact.module.css';

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(onOpen({ data: { id, name, number }, type: 'edit' }));
  };

  const handleDelete = () => {
    dispatch(onOpen({ data: { id, name, number }, type: 'delete' }));
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
