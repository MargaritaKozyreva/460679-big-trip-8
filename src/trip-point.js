import * as constant from './constants.js';
import {createElement} from './create-element.js';

export class TripPoint {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._icons = data.icons;
    this._offers = data.offers;
    this._description = data.description;
    this._picture = data.picture;
    this._timeStart = data.timeStart;
    this._timeEnd = data.timeEnd;
    this._price = data.price;
    this._currencyRate = data.currencyRate;
    this.element = null;
    this._onClick = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  get _getDuration() {
    return constant.getDuration(this._timeStart, this._timeEnd);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  bind() {
    this.element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this.element.removeEventListener(`click`, this._onPointClick);
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
  <p class="trip-point__price">${this._price} ${this._currencyRate}</p>
  <ul class="trip-point__offers">
    ${this._offers.map((elem) => `<li><button class="trip-point__offer">${elem}</button></li>`).join(``)}
  </ul>
</article>`.trim();
  }


  render() {
    this.element = createElement(this.template);
    this.bind();
    return this.element;
  }

  unrender() {
    this.unbind();
    this.element = null;
  }

  _onPointClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }
}
