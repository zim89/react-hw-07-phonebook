import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';
import './AddContactForm.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { Accent } from 'components/App/Styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { addContact } from 'redux/operations';

const INITIAL_VALUES = {
  name: '',
  number: '',
};

const addContactSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .min(3, 'Name must be 3-25 characters long')
    .max(25, 'Name must be 3-25 characters long')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Enter valid symbols'
    ),
  number: yup
    .string()
    .required('Required')
    .min(6, 'Number must be 6-13 characters long')
    .max(13, 'Number must be 6-13 characters long')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Enter valid symbols'
    ),
});

const AddContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    const isIncludeName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isIncludeNumber = contacts.some(
      contact =>
        contact.number.replace('+', '').split('-').join('') ===
        number.replace('+', '').split('-').join('')
    );

    if (isIncludeName) {
      toast.error(() => (
        <div>
          <Accent>{name}</Accent> is already in contacts
        </div>
      ));
      resetForm();
      return;
    }
    if (isIncludeNumber) {
      toast.error(() => (
        <div>
          phonenumber <Accent>{number}</Accent> is already in contacts
        </div>
      ));
      resetForm();
      return;
    }

    dispatch(addContact(values));
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={addContactSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form" autoComplete="off">
            <div className="form__field">
              <label htmlFor="name">Contact name</label>
              <Field
                className={classNames('form__input', {
                  'form__input--error': errors.name && touched.name,
                })}
                name="name"
                type="text"
                placeholder="Enter name..."
              />
              <ErrorMessage
                className="error-message"
                name="name"
                component="div"
              />
            </div>

            <div className="form__field">
              <label htmlFor="number">Phone number </label>
              <Field
                className={classNames('form__input', {
                  'form__input--error': errors.name && touched.name,
                })}
                name="number"
                type="text"
                placeholder="Enter number..."
              />
              <ErrorMessage
                className="error-message"
                name="number"
                component="div"
              />
            </div>

            <button className="form__btn" type="submit">
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddContactForm;
