import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';

import { selectIsLoggingOut } from '../../redux/auth/slice';
import { selectIsOpen } from '../../redux/modal/slice';
import { selectIsDeleting, selectIsEditing } from '../../redux/contacts/slice';

import EditForm from '../EditForm/EditForm';
import PromtModal from '../PromtModal/PromtModal';

import css from './Modal.module.css';

const Modal = () => {
  ReactModal.setAppElement('#root');
  const modalIsOpen = useSelector(selectIsOpen);
  const isEditing = useSelector(selectIsEditing);
  const isDeleting = useSelector(selectIsDeleting);
  const isLoggingOut = useSelector(selectIsLoggingOut);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      overlayClassName={css.modalOverlay}
      className={css.modalContainer}
      bodyOpenClassName={css.noScroll}>
      <div>
        {isEditing && <EditForm />}
        {isDeleting && <PromtModal actionType={'delete'} />}
        {isLoggingOut && <PromtModal actionType={'signout'} />}
      </div>
    </ReactModal>
  );
};

export default Modal;
