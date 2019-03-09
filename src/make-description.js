import * as constant from './constants.js';
import {cities} from './make-cities.js';

const createCities = (city) => {

  const timeStart = constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT);
  const timeEnd = constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT);

  return {
    id: city.id,
    title: city.title,
    icon: city.icon,
    offers: constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT),
    desc: constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`),
    pic: constant.getRandomPicture(),
    timeStart,
    timeEnd,
    price: `&euro;&nbsp;${constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT)}`,
  };
};

const eventMocks = cities.map(createCities);

export {eventMocks};
