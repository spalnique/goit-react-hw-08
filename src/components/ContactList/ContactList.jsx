import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import {
  selectContacts,
  selectError,
  selectIsLoading,
  selectFilteredContacts,
} from '../../redux/contacts/selectors';

import css from '../ContactList/ContactList.module.css';

const ContactList = () => {
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const visibleContacts = useSelector(selectFilteredContacts);
  const allContacts = useSelector(selectContacts);
  return (
    <>
      <ul className={css.contactList}>
        {isLoading && <p>Contacts are being loaded...</p>}
        {error && <p>Something went wrong. Please, try again later</p>}
        {!isLoading && !error && allContacts.length === 0 && (
          <p>Your contact list is empty</p>
        )}
        {allContacts.length > 0 && visibleContacts.length === 0 && (
          <p>Nothing found</p>
        )}
        {!isLoading &&
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
