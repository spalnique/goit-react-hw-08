import { useDispatch, useSelector } from 'react-redux';
import { selectUser, toggleIsLoggingOut } from '../../redux/auth/slice';
import { openModal } from '../../redux/modal/slice';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleIsLoggingOut());
    dispatch(openModal());
  };
  return (
    <ul className={css.userMenuList}>
      <li className={css.welcomeUser}>
        <p>Hello, {name}!</p>
      </li>
      <li className={css.logoutUser}>
        <button onClick={handleClick}>Sign out</button>
      </li>
    </ul>
  );
};

export default UserMenu;
