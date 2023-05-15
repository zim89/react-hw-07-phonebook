import { ToastContainer } from 'react-toastify';
import AddContactForm from 'components/AddContactForm/AddContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { Section, Container, Title } from './Styled';
import 'react-toastify/dist/ReactToastify.min.css';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selectors';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Section>
        <Container>
          <Title>Phonebook</Title>
          <AddContactForm />
        </Container>
      </Section>

      <Section>
        <Container>
          <Title>Contacts</Title>
          <Filter />
          {isLoading && !error
            ? Loading.standard({
                backgroundColor: 'transparent',
              })
            : Loading.remove()}
          <ContactList />
        </Container>
      </Section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
