import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav>
      <NavLink to={'/'}>Home</NavLink>
      {isLoggedIn ? (
        <NavLink to={'/contacts'}>Contacts</NavLink>
      ) : (
        <>
          <NavLink to={'/register'}>Register</NavLink>
          <NavLink to={'/login'}>Log in</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
