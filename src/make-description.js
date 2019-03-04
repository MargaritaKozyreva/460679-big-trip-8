import {getRandomPictures, getRandomDescription} from './constants.js';
import {cities} from './make-cities.js';
export const eventMocks = cities.map((city) => {
  return {
    id: city.id,
    title: city.title,
    icon: city.icon,
    offers: city.offers,
    desc: getRandomDescription(),
    pic: getRandomPictures(),
    timeStart: `10:00`,
    timeEnd: `11:30`,
    price: `&euro;&nbsp;20`,
  };
});
