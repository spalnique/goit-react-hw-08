import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  onClose,
  selectIsOpen,
  selectModalType,
} from '../../redux/modal/slice';
import EditForm from '../EditForm/EditForm';
import PromtModal from '../PromtModal/PromtModal';

import css from './Modal.module.css';

const Modal = () => {
  ReactModal.setAppElement('#root');

  const dispatch = useDispatch();

  const modalIsOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        dispatch(onClose());
      }}
      overlayClassName={css.modalOverlay}
      className={css.modalContainer}
      bodyOpenClassName={css.noScroll}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={false}>
      {modalType === 'edit' && <EditForm />}
      {modalType === 'delete' && <PromtModal actionType={modalType} />}
      {modalType === 'logout' && <PromtModal actionType={modalType} />}
    </ReactModal>
  );
};

export default Modal;
