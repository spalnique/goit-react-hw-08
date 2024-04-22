import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <ul className={css.authList}>
      <li>
        <NavLink to="/register" className={css.authLink}>
          Sign up
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className={css.authLink}>
          Sign in
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;
