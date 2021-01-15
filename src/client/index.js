import { handleSubmit, tripUI } from './js/formHandler';
import 'bootstrap';
import './styles/main.scss';
import './views/img/SmallLogo.png';

const save_trip = document.querySelector('#travel-summary');
save_trip.addEventListener('click', (e) => {
  handleSubmit(e);
});

const remove_trip = document.querySelector('#remove_trip');
remove_trip.addEventListener('click', (e) => {
  document.getElementById('trip_form').reset();
  tripUI.classList.add('invisible');
  location.reload();
});
