import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';
import {eventMocks} from './make-description.js';
import * as constant from './constants.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

const templateEvent = eventMocks.map(renderEvent);

tripItems.insertAdjacentHTML(`beforeend`, templateEvent.join(``));

const addRenderEvents = (numbers) => {
  //let eventList = [...new Array(numbers)].map(() => templateEvent.join(``));
  let arr = [];
  const arrayRandomEvents = [];
  for (let i = 0; i < numbers; i++) {
    arrayRandomEvents.push(templateEvent[i]);

  }
  return tripItems.insertAdjacentHTML(`beforeend`, arrayRandomEvents);
};

const templateFilter = constant.filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = constant.getRandomCount(1, constant.EVENT_COUNT);
  tripItems.innerHTML = ``;
  addRenderEvents(randomCountEvents);
});
