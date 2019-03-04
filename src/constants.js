import {stackOffers} from './make-offers.js';

export const getRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const EVENT_COUNT = 7;
export const SENTENCE_COUNT = 3;

export const getRandomPictures = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

export const getRandomDescription = () => {
  let newSentenceArray = [];

  let desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  let arraySentence = desc.split(`. `);

  for (let i = 1; i < getRandomCount(2, SENTENCE_COUNT); i++) {
    let rand = Math.floor(Math.random() * arraySentence.length);
    newSentenceArray.push(arraySentence[rand]);
  }
  return [...new Set(newSentenceArray)].join(`. `);
};

export const setIcon = (name) => {
  let icon = ``;
  for (let elem of icons) {
    if (elem.title === name) {
      icon = elem.icon;
    }
  }
  return icon;
};

export const setOffer = (city) => {
  let offers = ``;
  for (let elem of stackOffers) {
    if (elem.id === city) {
      offers = elem.offers;
    }
  }
  const offersTemplate = `${offers.map((elem) => (`<li><button class="trip-point__offer">${elem.offer} ${elem.price}</button></li>`)).join(``)}`;
  return offersTemplate;
};

const icons = [{
  title: `Taxi`,
  icon: `🚕`,
},
{
  title: `Bus`,
  icon: `🚌`,
},
{
  title: `Train`,
  icon: `🚂`,
},
{
  title: `Ship`,
  icon: `🛳️`,
},
{
  title: `Transport`,
  icon: `🚊`,
},
{
  title: `Drive`,
  icon: `🚗`,
},
{
  title: `Flight`,
  icon: `✈️`,
},
{
  title: `Check-in`,
  icon: `🏨`,
},
{
  title: `Sightseeing`,
  icon: `🏛️`,
},
{
  title: `Restaurant`,
  icon: `🍴`,
},
];

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
