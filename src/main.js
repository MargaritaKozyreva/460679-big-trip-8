import renderFilter from './make-filter.js';
import TripPoint from './trip-point.js';
import TripPointEdit from './trip-point-edit.js';
import {cities} from './make-cities.js';
import * as constant from './constants.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripTitle = document.querySelector(`.trip-point__title`);
const tripFilter = document.querySelector(`.trip-filter`);

const addListener = (tripPointElem, tripPointElemEdit) => {
  tripPointElem.onClick = () => {
    tripPointElemEdit.render();
    tripItems.replaceChild(tripPointElemEdit.element, tripPointElem.element);
    tripPointElem.unrender();
  };

  tripPointElemEdit.onSubmit = () => {
    tripPointElem.render();
    tripItems.replaceChild(tripPointElem.element, tripPointElemEdit.element);
    tripPointElemEdit.unrender();
  };

  tripPointElemEdit.onReset = () => {
    tripPointElem.render();
    tripItems.replaceChild(tripPointElem.element, tripPointElemEdit.element);
    tripPointElemEdit.unrender();
  };
};

cities.forEach((item) => {
  const tripComponent = new TripPoint(item);
  const tripComponentEdit = new TripPointEdit(item);
  tripItems.appendChild(tripComponent.render());
  addListener(tripComponent, tripComponentEdit);
  constant.TRIP_COMPONENT_ARRAY.push(tripComponent);
});

const templateFilter = constant.filters.map((filter) => {
  return renderFilter(`${filter.type}`, `${filter.id}`, `${filter.name}`, `${filter.value}`, `${filter.isChecked}`);
}).join(``);
tripFilter.insertAdjacentHTML(`beforeend`, templateFilter);


tripFilter.addEventListener(`click`, () => {
  const randomCountEvents = constant.getRandomCount(1, constant.EVENT_COUNT);
  tripItems.innerHTML = ``;
  constant.addRenderEvents(randomCountEvents, constant.TRIP_COMPONENT_ARRAY, tripItems);
});
