import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  message: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function onFormInput(e) {
  e.preventDefault();
  const inputText = { email: refs.email.value, message: refs.message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputText));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsMessage = JSON.parse(savedMessage);

  if (savedMessage) {
    console.log(parsMessage);
    refs.message.value = parsMessage.message;
    refs.email.value = parsMessage.email;
  }
}

// const formData = {};
// refs.form.addEventListener('input', e => {
//    formData[e.target.name] = e.target.value;
//    console.log(formData);
// }
// )
