import renderEvent from './make-event.js';
import renderFilter from './make-filter.js';
import {eventMocks} from './make-description.js';
import * as constant from './constants.js';
import lodash from 'lodash';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

const markup = lodash.shuffle(eventMocks.map(renderEvent));

tripItems.insertAdjacentHTML(`beforeend`, markup.join(``));

const templateFilter = constant.filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = constant.getRandomCount(1, constant.EVENT_COUNT);
  tripItems.innerHTML = ``;
  constant.addRenderEvents(randomCountEvents, markup, tripItems);
});
