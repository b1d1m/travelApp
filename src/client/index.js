import { handleSubmit } from './js/formHandler';
import 'bootstrap';
import './styles/main.scss';
import './views/img/SmallLogo.png';

const submit = document.querySelector('.submit');
submit.addEventListener('click', (e) => {
  handleSubmit(e);
});
