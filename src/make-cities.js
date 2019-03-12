import * as constant from './constants.js';

export const cities = [{

  id: `Airport`,
  title: `Taxi to`,
  icons: {
    title: `Taxi`,
    icon: constant.getIcon(`Taxi`),
  },
  offers: constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT),
  description: constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`),
  picture: constant.getRandomPicture(),
  timeStart: constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT).join(``),
  timeEnd: constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT).join(``),
  price: constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT),
  currencyRate: constant.CURRENCY_RATE,
},
{
  id: `Geneva`,
  title: `Flight to`,
  icons: {
    title: `Flight`,
    icon: constant.getIcon(`Flight`),
  },
  offers: constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT),
  description: constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`),
  picture: constant.getRandomPicture(),
  timeStart: constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT).join(``),
  timeEnd: constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT).join(``),
  price: constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT),
  currencyRate: constant.CURRENCY_RATE,
},
{
  id: `Chamonix`,
  title: `Drive to`,
  icons: {
    title: `Drive`,
    icon: constant.getIcon(`Drive`),
  },
  offers: constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT),
  description: constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`),
  picture: constant.getRandomPicture(),
  timeStart: constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT).join(``),
  timeEnd: constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT).join(``),
  price: constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT),
  currencyRate: constant.CURRENCY_RATE,
},
{
  id: `hotel`,
  title: `Check into a`,
  icons: {
    title: `Check`,
    icon: constant.getIcon(`Checkin`),
  },
  offers: constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT),
  description: constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`),
  picture: constant.getRandomPicture(),
  timeStart: constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT).join(``),
  timeEnd: constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT).join(``),
  price: constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT),
  currencyRate: constant.CURRENCY_RATE,
},
];
