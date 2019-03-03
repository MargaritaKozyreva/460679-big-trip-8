export const getRandomCount = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const EVENT_COUNT = 7;
export const SENTENCE_COUNT = 3;

export const setIcon = (name) => {
  let icon = ``;
  for (let elem of icons) {
    if (elem.title === name) {
      icon = elem.icon;
    }
  }
  return icon;
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

const getRandomPictures = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const getRandomDescription = () => {
  let newSentenceArray = [];

  let desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  let arraySentence = desc.split(`. `);

  for (let i = 1; i < getRandomCount(2, SENTENCE_COUNT); i++) {
    let rand = Math.floor(Math.random() * arraySentence.length);
    newSentenceArray.push(arraySentence[rand]);
  }
  return [...new Set(newSentenceArray)].join(`. `);
};
const cities = [{
  name: `Amsterdam`,
  title: `Taxi to Airport`,
  icon: setIcon(`Taxi`),
  offers: [{
    offer: `Order UBER`,
    price: `&euro;&nbsp;20`
  }],
},
{
  name: `Geneva`,
  title: `Flight to Geneva`,
  icon: setIcon(`Flight`),
  offers: [{
    offer: `Upgrade to business`,
    price: `&euro;&nbsp;20`
  },
  {
    offer: `Select meal`,
    price: `&euro;&nbsp;20`
  }
  ],
},
{
  name: `Chamonix`,
  title: `Drive to Chamonix`,
  icon: setIcon(`Drive`),
  offers: [{
    offer: `Rent a car`,
    price: `&euro;&nbsp;200`
  },
  {
    offer: `Upgrade to business`,
    price: `&euro;&nbsp;20`
  }
  ],
},
{
  name: `France`,
  title: `Check into a hotel`,
  icon: setIcon(`Check-in`),
  offers: [{
    offer: `Add breakfast`,
    price: `&euro;&nbsp;20`
  }],
},
];

export const descriptions = cities.map((city) => {
  return {
    id: city.name,
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

console.log(descriptions);

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
