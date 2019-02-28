import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);
const getRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const eventCount = 7;
const eventArray = new Array(7);
const events = [{
  title: `Taxi to Airport`,
  icon: `🚕`,
  time: `10:00 — 11:00`,
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
//     {
//       title: `Flight to Geneva`,
//       icon: `✈️`,
//       time: `10:00 — 11:00`,
//       price: `&euro;&nbsp;20`,
//       offers: [
//         {
//           offer: `Upgrade to business`,
//           price: `&euro;&nbsp;20`
//         },
//         {
//           offer: `Select meal`,
//           price: `&euro;&nbsp;20`
//         }
//       ]
//     },
//     {
//       title: `Drive to Chamonix`,
//       icon: `🚗`,
//       time: `10:00 — 11:00`,
//       price: `&euro;&nbsp;20`,
//       offers: [
//         {
//           offer: `Rent a car`,
//           price: `&euro;&nbsp;200`
//         },
//         {
//           offer: `Upgrade to business`,
//           price: `&euro;&nbsp;20`
//         }
//       ]
//     },
//     {
//       title: `Check into a hotel`,
//       icon: `🏨`,
//       time: `10:00 — 11:00`,
//       price: `&euro;&nbsp;20`,
//       offers: [
//         {
//           offer: `Add breakfast`,
//           price: `&euro;&nbsp;20`
//         },
//       ]
//     },
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

const getDuration = function (time) {
  const HOUR = 60;
  const generalTime = time.split(`—`);
  const getHoursTo = Number(generalTime[0].split(`:`)[0]);
  const getMinutesTo = Number(generalTime[0].split(`:`)[1]);

  const getHoursFrom = Number(generalTime[1].split(`:`)[0]);
  const getMinutesFrom = Number(generalTime[1].split(`:`)[1]);

  let diff = (getHoursTo * HOUR + getMinutesTo) - (getHoursFrom * HOUR + getMinutesFrom);
  diff = Math.abs(diff);
  let diffH = Math.floor(diff / HOUR);
  let diffM = diff - diffH * HOUR;
  return `${diffH}H ${diffM}M`;
};

const getOffers = (...offers) => {
  let temp = offers.map((elem) => (`<ul class="trip-point__offers">${elem.map((i) => `<li><button class="trip-point__offer">${i.offer} ${i.price}</button></li>`).join(``)}</ul>`));
  return temp;
};

const templateEvent = events.map((event) => {
  return renderEvent(`${event.icon}`, `${event.title}`, `${event.time}`, getDuration(event.time), `${event.price}`, getOffers(event.offers));
}).join(``);
//tripItems.insertAdjacentHTML(`beforeend`, templateEvent);
[...eventArray].map(() => tripItems.insertAdjacentHTML(`beforeend`, templateEvent));

const templateFilter = filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = getRandomCount(1, eventCount);
  let eventList = ``;
  tripItems.innerHTML = ``;

  for (let i = 0; i < randomCountEvents; i++) {
    eventList += templateEvent;
  }
  tripItems.insertAdjacentHTML(`beforeend`, eventList);
});
