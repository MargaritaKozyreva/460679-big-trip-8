import renderFilter from './make-filter.js';
import TripPoint from './trip-point.js';
import TripPointEdit from './trip-point-edit.js';
import {cities} from './make-cities.js';
import * as constant from './constants.js';

const tripItems = document.querySelector(`.trip-day__items`);
const tripFilter = document.querySelector(`.trip-filter`);

cities.forEach((item) => {
  const tripComponent = new TripPoint(item);
  const tripComponentEdit = new TripPointEdit(item);
  tripItems.appendChild(tripComponent.render());

  tripComponent.onClick = () => {
    tripComponentEdit.render();
    tripItems.replaceChild(tripComponentEdit.element, tripComponent.element);
    tripComponent.unrender();
  };

  tripComponentEdit.onSubmit = (newObject) => {
    item.id = newObject.id;
    item.timeStart = newObject.timeStart;
    item.timeEnd = newObject.timeEnd;
    item.price = newObject.price;
    item.offers = newObject.offers;

    tripComponent.update(item);
    tripComponent.render();
    tripItems.replaceChild(tripComponent.element, tripComponentEdit.element);
    tripComponentEdit.unrender();
  };

  tripComponentEdit.onReset = () => {
    tripComponent.render();
    tripItems.replaceChild(tripComponent.element, tripComponentEdit.element);
    tripComponentEdit.unrender();
  };
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
