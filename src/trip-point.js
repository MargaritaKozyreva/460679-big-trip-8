import * as constant from './constants.js';
import {createElement} from './create-element.js';
export class TripPoint {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._icons = data.icons;
    this._element = null;
    this._onClick = null;
  }
  _onPointClick() {
    typeof this._onClick === `function` && this._onClick();
  }

  get _offers() {
    return constant.getRandomParam(constant.OFFERS, constant.OFFERS_COUNT);
  }

  get _desc() {
    return constant.getRandomParam(constant.DESCRIPTION, constant.DESCRIPTIONS_COUNT, `.`);
  }

  get _pic() {
    return constant.getRandomPicture();
  }

  get _timeStart() {
    return constant.getRandomParam(constant.TIME_START, constant.TIME_COUNT).join(``);
  }

  get _timeEnd() {
    return constant.getRandomParam(constant.TIME_END, constant.TIME_COUNT).join(``);
  }

  get _price() {
    return `${constant.CURRENCY_RATE} ${constant.getRandomParam(constant.PRICE, constant.PRICE_COUNT)}`;
  }

  get _getDuration() {
    return constant.getDuration(this._timeStart, this._timeEnd);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  bind() {
    this._element.addEventListener(`click`, this._onPointClick.bind(this));
  }

  get template() {
    return `
<article class="trip-point">
  <i class="trip-icon">${this._icons.icon}</i>
  <h3 class="trip-point__title">${this._title} ${this._id}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${this._timeStart} — ${this._timeEnd}</span>
    <span class="trip-point__duration">${this._getDuration}</span>
  </p>
  <p class="trip-point__price">${this._price}</p>
  <ul class="trip-point__offers">
    ${this._offers.map((elem) => `<li><button class="trip-point__offer">${elem}</button></li>`).join(``)}
  </ul>
</article>`.trim();
  }


  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    // this.unbind();
    this._element = null;
  }
}
