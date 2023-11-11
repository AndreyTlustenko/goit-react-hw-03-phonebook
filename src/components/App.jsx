// import { nanoid } from 'nanoid'
import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './Contacts/Contacts';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    
  let LocalContacts = localStorage.getItem('contacts');
  if (LocalContacts) {
    LocalContacts = JSON.parse(LocalContacts)
    this.setState({contacts: LocalContacts})
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleSubmit = obj => {
    const { contacts } = this.state;
    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === obj.name.toLowerCase()
    );
    if (!checkContact) {
      this.setState({ contacts: [...contacts, obj] });
      return;
    }
    alert(`${obj.name} is already in contacts `);
  };

  visibileContacts = () => {
    const { contacts, filter } = this.state;
    const normalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize)
    );
  };
  render() {
    const visibileContacts = this.visibileContacts();
    console.log(this.state);
    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.handleSubmit} contacts={this.state.contacts} />
        <h2>Contacts</h2>
        <Filter filterName={this.changeFilter} value={this.state.filter} />
        <ContactList
          contacts={visibileContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
