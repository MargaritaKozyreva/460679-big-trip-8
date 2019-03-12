import renderFilter from './make-filter.js';
import {TripPoint} from './trip-point.js';
import {TripPointEdit} from './trip-point-edit.js';
import {cities} from './make-cities.js';
import * as constant from './constants.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

const addListener = (elem, elemEdit) => {
  elem.onClick = () => {
    elemEdit.render();
    tripItems.replaceChild(elemEdit._element, elem._element);
    elem.unrender();
  };

  elemEdit.onSubmit = () => {
    elem.render();
    tripItems.replaceChild(elem._element, elemEdit._element);
    elemEdit.unrender();
  };

  elemEdit.onReset = () => {
    elem.render();
    tripItems.replaceChild(elem._element, elemEdit._element);
    elemEdit.unrender();
  };
};

cities.map((item) => {
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
