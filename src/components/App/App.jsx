import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { Container, TitlePrimary, TitleSecondary } from './App.styled';

const LOCAL_STORAGE_KEY = 'contacts-list';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    contacts.some(
      ({ name }) => name.toLowerCase().trim() === data.name.toLowerCase().trim()
    )
      ? alert('This contact is already in list')
      : setContacts([...contacts, data]);
  };

  const filterContact = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <Container>
      <TitlePrimary>Phonebook</TitlePrimary>
      <ContactForm onSubmit={formSubmitHandler} />

      <TitleSecondary>Contacts</TitleSecondary>
      <Filter
        filter={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <ContactList
        contacts={filterContact()}
        deleteContact={id => {
          setContacts(prevState =>
            prevState.filter(contact => contact.id !== id)
          );
          setFilter('');
        }}
      />
    </Container>
  );
}
