import * as constant from './constants.js';
export default (eventObj) => {

  return `
  <article class="trip-point">
  <i class="trip-icon">${eventObj.icon}</i>
  <h3 class="trip-point__title">${eventObj.title}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${eventObj.timeStart} — ${eventObj.timeEnd}</span>
    <span class="trip-point__duration">${constant.getDuration(eventObj.timeStart, eventObj.timeEnd)}</span>
  </p>
  <p class="trip-point__price">${eventObj.price}</p>
  <ul class="trip-point__offers">
  ${eventObj.offers.map((elem) => `<li><button class="trip-point__offer">${elem}</button></li>`).join(``)}
  </ul>
</article>
  `;
};
