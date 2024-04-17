import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../../redux/selectors';

import css from '../ContactList/ContactList.module.css';

const ContactList = () => {
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const visibleContacts = useSelector(selectFilteredContacts);
  const allContacts = useSelector(selectContacts);
  return (
    <>
      <ul className={css.contactList}>
        {loading && <p>Contacts are being loaded...</p>}
        {error && <p>Something went wrong. Please, try again later</p>}
        {!loading && !error && allContacts.length === 0 && (
          <p>Your contact list is empty</p>
        )}
        {allContacts.length > 0 && visibleContacts.length === 0 && (
          <p>Nothing found</p>
        )}
        {!loading &&
          allContacts.length > 0 &&
          visibleContacts.length > 0 &&
          visibleContacts.map((contact) => {
            return (
              <li key={contact.id}>
                <Contact contact={contact} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ContactList;
