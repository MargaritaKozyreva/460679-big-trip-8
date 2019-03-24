import moment from 'moment';
export const EVENT_COUNT = 7;

export const getRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const getRandomParam = (type, count, split = `,`) => {
  const arrayDesc = type.split(split);
  const randomIndex = getRandomCount(1, count);
  return [...new Array(randomIndex)].map(() => arrayDesc[getRandomCount(0, arrayDesc.length - 1)].trim());
};

export const getRandomPicture = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

export const TYPES = {
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
  DRIVE: `Drive`,
  FLIGHT: `Flight`,
  CHECK: `Check-in`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`,
};

export const ICONS = {
  [TYPES.TAXI]: `🚕`,
  [TYPES.BUS]: `🚌`,
  [TYPES.TRAIN]: `🚂`,
  [TYPES.SHIP]: `🛳️`,
  [TYPES.TRANSPORT]: `🚊`,
  [TYPES.DRIVE]: `🚗`,
  [TYPES.FLIGHT]: `✈️`,
  [TYPES.CHECK]: `🏨`,
  [TYPES.SIGHTSEEING]: `🏛️`,
  [TYPES.RESTAURANT]: `🍴`,
};

export const OFFERS_COUNT = 2;
export const PRICE_COUNT = 1;
const OFFERS_SET = `Add luggage, Switch to comfort class, Add meal, Choose seats`;
const PRICE_SET = `20, 30, 40, 50, 100, 150`;

const getOffers = () => {
  return Object.values(TYPES).reduce((obj, value) => {
    obj[value] = new Set(getRandomParam(OFFERS_SET, OFFERS_COUNT));
    return obj;
  }, {});
};

const getPrice = () => {
  return Object.values(TYPES).reduce((obj, value) => {
    obj[value] = getRandomParam(PRICE_SET, PRICE_COUNT);
    return obj;
  }, {});
};

export const OFFERS = getOffers();
export const PRICE = getPrice();
export const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const DESCRIPTIONS_COUNT = 3;
export const TIME_START = `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`;
export const TIME_END = `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`;
export const TIME_COUNT = 1;
export const CURRENCY_RATE = `€`;
export const TRIP_COMPONENT_ARRAY = [];
export const addRenderEvents = (numbers, array, container) => {
  [...new Array(numbers)].forEach(() => container.appendChild(array[getRandomCount(0, 3)].render()));
};

export const getDuration = function (startTime, endTime) {
  const start = moment.utc(startTime, `HH:mm`);
  const end = moment.utc(endTime, `HH:mm`);
  const diff = moment.utc(end.diff(start)).format(`h[h] m[m]`);
  return diff;
};

export const filters = [{
  type: `radio`,
  id: `filter-everything`,
  name: `filter`,
  value: `everything`,
  isChecked: true,
},
{
  type: `radio`,
  id: `filter-future`,
  name: `filter`,
  value: `future`,
  isChecked: true,
},
{
  type: `radio`,
  id: `filter-past`,
  name: `filter`,
  value: `past`,
  isChecked: true,
},
];
