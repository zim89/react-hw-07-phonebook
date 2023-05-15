import React from 'react';
import './ContactList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className="contactList">
      {filteredContacts.length
        ? filteredContacts.map(({ id, name, number }) => (
            <li className="contactList__item" key={id}>
              <div>
                {name}: <span className="contactList__number">{number}</span>
              </div>
              <button
                className="contactList__btn"
                type="button"
                onClick={() => {
                  dispatch(deleteContact(id));
                }}
              >
                Delete
              </button>
            </li>
          ))
        : null}
    </ul>
  );
};

export default ContactList;
