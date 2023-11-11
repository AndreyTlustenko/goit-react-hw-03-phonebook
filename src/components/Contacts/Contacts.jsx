import React from 'react';
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, onDelete }) => {
  return (
    <>
      <ul>
        {contacts.map(contact => {
          return (
            <ContactsListItem
              key={contact.id}
              name={contact.name}
              number={contact.number}
              id={contact.id}
              onDelete={onDelete}
            />
          );
        })}
      </ul>
    </>
  );
};

const ContactsListItem = ({ id, name, number, onDelete }) => {
  return (
    <li>
      <p>
        {name}:{number}
      </p>
      <button type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};



ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactsList;
