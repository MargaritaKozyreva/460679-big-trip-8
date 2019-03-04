import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';
import {eventMocks} from './make-description.js';
import * as constant from './constants.js';
import moment from 'moment';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

const getDuration = function (startTime, endTime) {
  const start = moment(startTime, `HH:mm`);
  const end = moment(endTime, `HH:mm`);
  const diff = moment.utc(end.diff(start)).format(`h[h] m[m]`);
  return diff;
};

// const getOffers = (offers) => {
//   return `${offers.map((elem) => (`<li><button class="trip-point__offer">${elem.offer} ${elem.price}</button></li>`)).join(``)}`;
// };

const templateEvent = eventMocks.map((eventData) => {
  return renderEvent(`${eventData.icon}`, `${eventData.title}`, `${eventData.timeStart} — ${eventData.timeEnd}`, getDuration(eventData.timeStart, eventData.timeEnd), `${eventData.price}`, `${eventData.offers}`);
}).join(``);

const addRenderEvents = (numbers) => {
  let eventList = ``;
  for (let i = 0; i < numbers; i++) {
    eventList += templateEvent;
  }
  return tripItems.insertAdjacentHTML(`beforeend`, eventList);
};

tripItems.insertAdjacentHTML(`beforeend`, templateEvent);

const templateFilter = constant.filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = constant.getRandomCount(1, constant.EVENT_COUNT);
  tripItems.innerHTML = ``;
  addRenderEvents(randomCountEvents);
});
