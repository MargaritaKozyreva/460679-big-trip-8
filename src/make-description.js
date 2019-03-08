import * as constant from './constants.js';
import {cities} from './make-cities.js';

const createCities = (city) => {

  const timeStart = constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT, false, false, true);
  const timeEnd = constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT, false, false, true);

  return {
    id: city.id,
    title: city.title,
    icon: city.icon,
    offers: constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT, false, true, false),
    desc: constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, true, false, false, `.`),
    pic: constant.getRandomPicture(),
    timeStart,
    timeEnd,
    price: `&euro;&nbsp;${constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT, false, false, true)}`,
  };
};

export const eventMocks = [];
cities.forEach((city) => {
  const newClone = Object.assign({}, createCities(city));
  eventMocks.push(newClone);
});
