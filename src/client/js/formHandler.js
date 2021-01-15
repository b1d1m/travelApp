const tripInfo = {}; //To save trip Infos

// All APIs details
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const geoUserName = 'b1d1m';
const weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherKey = '207f839d97284c2893c0a9f9f861665e';
const pixUrl = 'https://pixabay.com/api/?key=';
const pixKey = '19827876-0a997e728bb8758d504d57ae8';

const tripUI = document.getElementById('trip_Info');

// handleSubmit is function to handle all APIs
function handleSubmit(event) {
  event.preventDefault();

  tripInfo['toCity'] = document.getElementById('to').value;
  tripInfo['startDate'] = document.getElementById('start-date').value;
  tripInfo['endDate'] = document.getElementById('end-date').value;
  tripInfo['remainingDays'] = daysDifference(tripInfo['startDate']);
  tripInfo['stayingDays'] = stayDays(
    tripInfo['startDate'],
    tripInfo['endDate']
  ); // this is to show how many days is the trip .. Stand out project

  getLatLon(tripInfo['toCity'])
    .then((geoInfo) => {
      let lat = geoInfo.geonames[0].lat;
      let lon = geoInfo.geonames[0].lng;
      tripInfo['country'] = geoInfo.geonames[0].countryName;
      return getWeather(lat, lon, tripInfo['startDate']);
    })
    .then((weatherInfo) => {
      tripInfo['temperature'] = weatherInfo.data[0].temp;
      return getPix(tripInfo['toCity']);
    })
    .then((pixInfo) => {
      tripInfo['img'] = pixInfo['hits'][0]['webformatURL'];
      return postTrip(tripInfo);
    })
    .then((postedData) => {
      updateTrip(postedData);
    });
}
// Get Lat,Lon and country from API
async function getLatLon(city) {
  const res = await fetch(`${geoURL}${city}&username=${geoUserName}`);
  try {
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
//Get weather from API
async function getWeather(latitude, longitude, date) {
  const res = await fetch(
    `${weatherUrl}${latitude}&lon=${longitude}&key=${weatherKey}`
  );
  try {
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
// Get picture from API
async function getPix(city) {
  const res = await fetch(`${pixUrl}${pixKey}&q=${city}`);
  try {
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
// to post Trip Info to server
async function postTrip(tData) {
  const res = await fetch('http://localhost:8081/trip', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tData),
  });
  try {
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
// to check the difference days from Start date to tody
function daysDifference(tripDate) {
  let sDate = new Date(tripDate); // sDate is date of starting the trip
  let todayDate = new Date();
  return Math.floor(
    (Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate()) -
      Date.UTC(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      )) /
      (1000 * 60 * 60 * 24)
  );
}
// to check how many days is the trip
function stayDays(tripStart, tripEnd) {
  let sDate = new Date(tripStart); // sDate is date of starting the trip
  let eDate = new Date(tripEnd); //eDate is the date to end the trip
  return Math.floor(
    (Date.UTC(eDate.getFullYear(), eDate.getMonth(), eDate.getDate()) -
      Date.UTC(sDate.getFullYear(), sDate.getMonth(), sDate.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

function updateTrip(data) {
  tripUI.classList.remove('invisible');
  let tripImg = document.getElementById('des_img');
  let tripTo = document.getElementById('tripFrom');
  let tripCountry = document.getElementById('country');
  let tripDate = document.getElementById('tripDate');
  let tripWeather = document.getElementById('tripWeather');
  let tripRemainDays = document.getElementById('remainDays');
  let tripStayDays = document.getElementById('stayDays');

  tripImg.setAttribute('src', data.img);
  tripTo.innerText = data.to;
  tripCountry.innerText = data.country;
  tripDate.innerHTML = data.date;
  tripWeather.innerHTML = data.temperature;
  tripRemainDays.innerHTML = data.remainDays;
  tripStayDays.innerHTML = data.stayDays;
}
export { handleSubmit, tripUI };
