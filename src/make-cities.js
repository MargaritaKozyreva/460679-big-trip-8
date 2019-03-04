import {setIcon, setOffer} from './constants.js';

export const cities = [{
  id: `Amsterdam`,
  title: `Taxi to Airport`,
  icon: setIcon(`Taxi`),
  offers: setOffer(`Amsterdam`),
},
{
  id: `Geneva`,
  title: `Flight to Geneva`,
  icon: setIcon(`Flight`),
  offers: setOffer(`Geneva`),
},
{
  id: `Chamonix`,
  title: `Drive to Chamonix`,
  icon: setIcon(`Drive`),
  offers: setOffer(`Chamonix`),
},
{
  id: `France`,
  title: `Check into a hotel`,
  icon: setIcon(`Check-in`),
  offers: setOffer(`France`),
},
];
