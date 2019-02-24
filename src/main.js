import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';

const tripItems = document.querySelector(`.trip-day__items`);

const events = [
  {
    title: `Taxi to Airport`,
    icon: `🚕`,
    time: `10:30-11:30`,
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
    time: `10:30-11:30`,
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
    time: `10:30-11:30`,
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
    time: `10:30-11:30`,
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
  const generalTime = time.split(`-`);
  const getHoursTo = generalTime[0].split(`:`)[0];
  const getMinutesTo = generalTime[0].split(`:`)[1];

  const getHoursFrom = generalTime[1].split(`:`)[0];
  const getMinutesFrom = generalTime[1].split(`:`)[1];

  let diff = (getHoursTo * 60 + getMinutesTo) - (getHoursFrom * 60 + getMinutesFrom);
  diff = Math.abs(diff);
  let diffH = Math.floor(diff / 60);
  let diffM = diff - diffH * 60;
  return `${diffH + diffM}`;
};

const getOffers = (offer, price) => {
  return `${offer} +${price}`;
};

const templateEvent = events.map((event) => {
  return renderEvent(`${event.icon}`, `${event.title}`, `${event.time}`, getDuration(event.time), `${event.price}`, getOffers(event.offers[0].offer, event.offers[0].price));
}).join(``);
tripItems.insertAdjacentHTML(`beforeend`, templateEvent);
