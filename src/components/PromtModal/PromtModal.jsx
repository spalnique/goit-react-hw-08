import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { onClose, selectModalData } from '../../redux/modal/slice';
import { logout } from '../../redux/auth/operations';

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
        <div>
          <div>
            <span>Are you sure to delete this contact?</span>
            <span>{contact.name}</span>
          </div>
          <div>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </div>
      );
    }
    case 'logout':
      return (
        <div>
          <span>Are you sure to logout?</span>
          <div>
            <button onClick={handleLogout}>Yes</button>
            <button onClick={handleCancel}>No</button>
          </div>
        </div>
      );
    default:
      return;
  }
};

export default PromtModal;
