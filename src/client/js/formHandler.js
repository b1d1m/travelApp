const tripInfo = {}; //To save trip Infos

// All APIs details
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const geoUserName = 'b1d1m';
const weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherKey = '207f839d97284c2893c0a9f9f861665e';
const pixUrl = 'https://pixabay.com/api/?key=';
const pixKey = '19827876-0a997e728bb8758d504d57ae8';

function handleSubmit(event) {
  event.preventDefault();

  let toCity = document.getElementById('to').value;
  let startDate = document.getElementById('start-date').value;
  let endDate = document.getElementById('end-date').value;
  console.log(toCity);
  console.log(startDate);
  console.log(endDate);
}

export { handleSubmit };
