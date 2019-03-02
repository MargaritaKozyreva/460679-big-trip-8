import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';
import moment from 'moment';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);
const getRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const EVENT_COUNT = 7;
const events = new Array(EVENT_COUNT);
const eventMocks = [{
  title: `Taxi to Airport`,
  icon: `🚕`,
  timeStart: `10:00`,
  timeEnd: `11:30`,
  price: `&euro;&nbsp;20`,
  offers: [{
    offer: `Order UBER`,
    price: `&euro;&nbsp;20`
  },
  {
    offer: `Upgrade to business`,
    price: `&euro;&nbsp;20`
  }
  ]
},
// {
//   title: `Flight to Geneva`,
//   icon: `✈️`,
//   timeStart: `10:00`,
//   timeEnd: `11:00`,
//   price: `&euro;&nbsp;20`,
//   offers: [
//     {
//       offer: `Upgrade to business`,
//       price: `&euro;&nbsp;20`
//     },
//     {
//       offer: `Select meal`,
//       price: `&euro;&nbsp;20`
//     }
//   ]
// },
// {
//   title: `Drive to Chamonix`,
//   icon: `🚗`,
//   timeStart: `10:00`,
//   timeEnd: `11:00`,
//   price: `&euro;&nbsp;20`,
//   offers: [
//     {
//       offer: `Rent a car`,
//       price: `&euro;&nbsp;200`
//     },
//     {
//       offer: `Upgrade to business`,
//       price: `&euro;&nbsp;20`
//     }
//   ]
// },
// {
//   title: `Check into a hotel`,
//   icon: `🏨`,
//   timeStart: `10:00`,
//   timeEnd: `11:00`,
//   price: `&euro;&nbsp;20`,
//   offers: [
//     {
//       offer: `Add breakfast`,
//       price: `&euro;&nbsp;20`
//     },
//   ]
// },
];

const filters = [
  {
    type: `radio`,
    id: `filter-everything`,
    name: `filter`,
    value: `everything`,
    isChecked: true,
  },
  {
    type: `radio`,
    id: `filter-future`,
    name: `filter`,
    value: `future`,
    isChecked: true,
  },
  {
    type: `radio`,
    id: `filter-past`,
    name: `filter`,
    value: `past`,
    isChecked: true,
  },
];

const getDuration = function (startTime, endTime) {
  let start = moment(startTime, `HH:mm`);
  let end = moment(endTime, `HH:mm`);
  let diff = moment.utc(end.diff(start)).format(`h[h] m[m]`);
  return diff;
};

const getOffers = (offers) => {
  return offers.map((elem) => (`<ul class="trip-point__offers"><li><button class="trip-point__offer">${elem.offer} ${elem.price}</button></li>`)).join(``);
};

const templateEvent = eventMocks.map((event) => {
  return renderEvent(`${event.icon}`, `${event.title}`, `${event.timeStart} — ${event.timeEnd}`, getDuration(event.timeStart, event.timeEnd), `${event.price}`, getOffers(event.offers));
}).join(``);

// tripItems.insertAdjacentHTML(`beforeend`, templateEvent);

[...events].forEach(() =>
  tripItems.insertAdjacentHTML(`beforeend`, templateEvent));

const templateFilter = filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = getRandomCount(1, EVENT_COUNT);
  let eventList = ``;
  tripItems.innerHTML = ``;

  for (let i = 0; i < randomCountEvents; i++) {
    eventList += templateEvent;
  }
  tripItems.insertAdjacentHTML(`beforeend`, eventList);
});
