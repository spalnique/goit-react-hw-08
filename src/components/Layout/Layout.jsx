import AppBar from '../AppBar/AppBar';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main className={css.mainContainer}>{children}</main>
    </>
  );
};

export default Layout;
