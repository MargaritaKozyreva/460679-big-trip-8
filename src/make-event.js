export default (icon, title, time, duration, price, offers) => {

  return `
  <article class="trip-point">
  <i class="trip-icon">${icon}</i>
  <h3 class="trip-point__title">${title}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${time}</span>
    <span class="trip-point__duration">${duration}</span>
  </p>
  <p class="trip-point__price">${price}</p>
  <ul class="trip-point__offers">
  ${offers}
  </ul>
</article>
  `;
};
