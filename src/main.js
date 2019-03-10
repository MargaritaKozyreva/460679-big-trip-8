import renderFilter from './make-filter.js';
import {TripPoint} from './trip-point.js';
import {TripPointEdit} from './trip-point-edit.js';
import {cities} from './make-cities.js';
import * as constant from './constants.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

//cities.map((item) => tripItems.appendChild(new TripPoint(item).render()));

const tripComponent = new TripPoint(cities[0]);
const tripComponentEdit = new TripPointEdit(cities[0]);
tripItems.appendChild(tripComponent.render());
tripComponent.onClick = () => {
  tripComponentEdit.render();
  tripItems.replaceChild(tripComponentEdit._element, tripComponent._element);
  tripComponent.unrender();
};

tripComponentEdit.submit = () => {
  tripComponent.render();
  tripItems.replaceChild(tripComponent._element, tripComponentEdit._element);
  tripComponentEdit.unrender();
}

const pointComponent = cities.map((item) => new TripPoint(item));
// console.log(pointComponent[0]._title);
const templateFilter = constant.filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = constant.getRandomCount(1, constant.EVENT_COUNT);
  tripItems.innerHTML = ``;
  constant.addRenderEvents(randomCountEvents, pointComponent, tripItems);
});
