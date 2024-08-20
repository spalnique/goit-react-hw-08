import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { refreshUser } from '../../redux/auth/operations';

import Layout from '../Layout/Layout';
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const HomePage = lazy(() => import('../../pages/HomePage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));
const Modal = lazy(() => import('../Modal/Modal'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Routes>
        <Modal />
      </Suspense>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 80,
          right: 20,
        }}
      />
    </Layout>
  );
};

export default App;
