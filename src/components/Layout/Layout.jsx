import { Suspense } from 'react';
import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>
        <main>{children}</main>
      </Suspense>
    </div>
  );
};

export default Layout;
