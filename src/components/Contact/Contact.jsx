import { useDispatch } from 'react-redux';

import { onOpen } from '../../redux/modal/slice';

import css from '../Contact/Contact.module.css';
import { actionType } from '../../redux/constants';

const { actionEdit, actionDelete } = actionType;

const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(onOpen({ data: { id, name, number }, actionType: actionEdit }));
  };

  const handleDelete = () => {
    dispatch(onOpen({ data: { id, name, number }, actionType: actionDelete }));
  };

  return (
    <div className={css.contactContainer}>
      <ul className={css.contactInfo}>
        <li>{name}</li>
        <li>{number}</li>
      </ul>
      <button type="button" onClick={handleEdit}>
        edit
      </button>
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default Contact;
