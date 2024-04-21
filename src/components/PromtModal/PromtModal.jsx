import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { toggleIsDeleting } from '../../redux/contacts/slice';
import { closeModal, selectModalData } from '../../redux/modal/slice';
import { toggleIsLoggingOut } from '../../redux/auth/slice';
import { signout } from '../../redux/auth/operations';

const PromtModal = ({ actionType }) => {
  const dispatch = useDispatch();
  const modalData = useSelector(selectModalData);
  switch (actionType) {
    case 'delete': {
      return (
        <div>
          <div>
            <span>Are you sure to delete this contact?</span>
            <span>{modalData.name}</span>
          </div>
          <div>
            <button
              onClick={() => {
                dispatch(deleteContact(modalData.id));
                dispatch(toggleIsDeleting());
                dispatch(closeModal());
              }}>
              Yes
            </button>
            <button
              onClick={() => {
                dispatch(toggleIsDeleting());
                dispatch(closeModal());
              }}>
              No
            </button>
          </div>
        </div>
      );
    }
    case 'signout':
      return (
        <div>
          <span>Are you sure to logout?</span>
          <div>
            <button
              onClick={() => {
                dispatch(toggleIsLoggingOut());
                dispatch(signout());
                dispatch(closeModal());
              }}>
              Yes
            </button>
            <button
              onClick={() => {
                dispatch(toggleIsLoggingOut());
                dispatch(closeModal());
              }}>
              No
            </button>
          </div>
        </div>
      );
    default:
      return;
  }
};

export default PromtModal;
