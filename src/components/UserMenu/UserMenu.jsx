import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../redux/auth/slice';
import { onOpen } from '../../redux/modal/slice';

import css from './UserMenu.module.css';
import { actionType } from '../../redux/constants';

const { actionLogout } = actionType;

const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(onOpen({ actionType: actionLogout }));
  };
  return (
    <div className={css.userMenuWrapper}>
      <span className={css.welcomeUser}>Hello, {name}!</span>
      <button className={css.logoutUser} onClick={handleClick}>
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
