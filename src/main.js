import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';

const tripItems = document.querySelector(`.trip-day__items`);

const events = [
  {
    title: `Taxi to Airport`,
    icon: `🚕`,
    time: `10:00 — 11:00`,
    price: `&euro;&nbsp;20`,
    offers: [
      {
        offer: `Order UBER`,
        price: `&euro;&nbsp;20`
      },
      {
        offer: `Upgrade to business`,
        price: `&euro;&nbsp;20`
      }
    ]
  },
  {
    title: `Flight to Geneva`,
    icon: `✈️`,
    time: `10:00 — 11:00`,
    price: `&euro;&nbsp;20`,
    offers: [
      {
        offer: `Upgrade to business`,
        price: `&euro;&nbsp;20`
      },
      {
        offer: `Select meal`,
        price: `&euro;&nbsp;20`
      }
    ]
  },
  {
    title: `Drive to Chamonix`,
    icon: `🚗`,
    time: `10:00 — 11:00`,
    price: `&euro;&nbsp;20`,
    offers: [
      {
        offer: `Rent a car`,
        price: `&euro;&nbsp;200`
      },
      {
        offer: `Upgrade to business`,
        price: `&euro;&nbsp;20`
      }
    ]
  },
  {
    title: `Check into a hotel`,
    icon: `🏨`,
    time: `10:00 — 11:00`,
    price: `&euro;&nbsp;20`,
    offers: [
      {
        offer: `Add breakfast`,
        price: `&euro;&nbsp;20`
      },
    ]
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
  let temp = ``;
  for (let elems of offers) {
    temp = (`<ul class="trip-point__offers">${elems.map((it) => `<li><button class="trip-point__offer">${it.offer} ${it.price}</button></li>`).join(``)}</ul>`);
  }
  return temp;
};

const templateEvent = events.map((event) => {
  return renderEvent(`${event.icon}`, `${event.title}`, `${event.time}`, getDuration(event.time), `${event.price}`, getOffers(event.offers));
}).join(``);
tripItems.insertAdjacentHTML(`beforeend`, templateEvent);
