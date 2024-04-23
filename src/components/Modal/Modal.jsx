import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { onClose } from '../../redux/modal/slice';
import { selectIsOpen, selectModalAction } from '../../redux/modal/selectors';
import { actionType } from '../../redux/constants';

import EditForm from '../EditForm/EditForm';
import PromtModal from '../PromtModal/PromtModal';

import css from './Modal.module.css';

const { actionEdit, actionDelete, actionLogout } = actionType;

const Modal = () => {
  ReactModal.setAppElement('#root');

  const dispatch = useDispatch();

  const modalIsOpen = useSelector(selectIsOpen);
  const modalAction = useSelector(selectModalAction);
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
      {modalAction === actionEdit && <EditForm />}
      {modalAction === actionDelete && <PromtModal action={actionDelete} />}
      {modalAction === actionLogout && <PromtModal action={actionLogout} />}
    </ReactModal>
  );
};

export default Modal;
