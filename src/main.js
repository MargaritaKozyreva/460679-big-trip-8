import renderFilter from './make-filter.js';
import {TripPoint} from './trip-point.js';
import {TripPointEdit} from './trip-point-edit.js';
import {cities} from './make-cities.js';
import * as constant from './constants.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

const addListener = (tripPointelem, tripPointelemEdit) => {
  tripPointelem.onClick = () => {
    tripPointelemEdit.render();
    tripItems.replaceChild(tripPointelemEdit.element, tripPointelem.element);
    tripPointelem.unrender();
  };

  tripPointelemEdit.onSubmit = () => {
    tripPointelem.render();
    tripItems.replaceChild(tripPointelem.element, tripPointelemEdit.element);
    tripPointelemEdit.unrender();
  };

  tripPointelemEdit.onReset = () => {
    tripPointelem.render();
    tripItems.replaceChild(tripPointelem.element, tripPointelemEdit.element);
    tripPointelemEdit.unrender();
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
