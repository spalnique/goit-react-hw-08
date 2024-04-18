import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { signout } from '../../redux/auth/operations';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signout());
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
