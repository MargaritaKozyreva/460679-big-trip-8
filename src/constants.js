import moment from 'moment';
export const EVENT_COUNT = 7;
export const OFFERS = `Add luggage, Switch to comfort class, Add meal, Choose seats`;
export const OFFERS_COUNT = 2;
export const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const DESCRIPTIONS_COUNT = 3;
export const TIME_START = `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`;
export const TIME_END = `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`;
export const TIME_COUNT = 1;
export const PRICE = `20, 30, 40, 50, 100, 150`;
export const CURRENCY_RATE = `€`;
export const PRICE_COUNT = 1;
export const getRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const getRandomPicture = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

export const getRandomParam = (type, count, split = `,`) => {
  const arrayDesc = type.split(split);
  const randomIndex = getRandomCount(1, count);
  return [...new Array(randomIndex)].map(() => arrayDesc[getRandomCount(0, arrayDesc.length - 1)].trim());
};

export const addRenderEvents = (numbers, array, container) => {
  [...new Array(numbers)].forEach(() => container.appendChild(array[getRandomCount(0, 3)].render()));
};

export const getIcon = (name) => {
  return icons[name];
};

export const getDuration = function (startTime, endTime) {
  const start = moment.utc(startTime, `HH:mm`);
  const end = moment.utc(endTime, `HH:mm`);
  const diff = moment.utc(end.diff(start)).format(`h[h] m[m]`);
  return diff;
};

const icons = {
  Taxi: `🚕`,
  Bus: `🚌`,
  Train: `🚂`,
  Ship: `🛳️`,
  Transport: `🚊`,
  Drive: `🚗`,
  Flight: `✈️`,
  Checkin: `🏨`,
  Sightseeing: `🏛️`,
  Restaurant: `🍴`,
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
