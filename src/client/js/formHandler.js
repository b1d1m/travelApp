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

  tripInfo['toCity'] = document.getElementById('to').value;
  tripInfo['startDate'] = document.getElementById('start-date').value;
  tripInfo['endDate'] = document.getElementById('end-date').value;
  tripInfo['remainingDays'] = daysDifference(tripInfo['startDate']);

  getLatLon(tripInfo['toCity'])
    .then((geoInfo) => {
      let lat = geoInfo.geonames[0].lat;
      let lon = geoInfo.geonames[0].lng;
      return getWeather(lat, lon, tripInfo['startDate']);
    })
    .then((weatherInfo) => {
      tripInfo['temperature'] = weatherInfo.data[0].temp;
      return getPix(tripInfo['toCity']);
    })
    .then((pixInfo) => {
      tripInfo['img'] = pixInfo['hits'][0]['webformatURL'];
      return postTrip(tripInfo);
    });
}

async function getLatLon(city) {
  const res = await fetch(`${geoURL}${city}&username=${geoUserName}`);
  try {
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

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

async function getPix(city) {
  const res = await fetch(`${pixUrl}${pixKey}&q=${city}`);
  try {
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

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
export { handleSubmit };
