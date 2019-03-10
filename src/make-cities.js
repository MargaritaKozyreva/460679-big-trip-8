import {getIcon} from './constants.js';

export const cities = [{
  id: `Airport`,
  title: `Taxi to`,
  icons: {
    title: `Taxi`,
    icon: getIcon(`Taxi`),
  },
},
{
  id: `Geneva`,
  title: `Flight to`,
  icons: {
    title: `Flight`,
    icon: getIcon(`Flight`),
  },
},
{
  id: `Chamonix`,
  title: `Drive to`,
  icons: {
    title: `Drive`,
    icon: getIcon(`Drive`),
  },
},
{
  id: `hotel`,
  title: `Check into a`,
  icons: {
    title: `Check`,
    icon: getIcon(`Checkin`),
  },
},
];
