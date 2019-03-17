import {getDuration} from './constants.js';
import Component from './component.js';

export default class extends Component {
  constructor(data) {
    super(data);
    this._onPointClick = this._onPointClick.bind(this);
    this._onClick = null;
  }

  get _getDuration() {
    return getDuration(this._timeStart, this._timeEnd);
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

  set onClick(fn) {
    this._onClick = fn;
  }

  bind() {
    this.element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this.element.removeEventListener(`click`, this._onPointClick);
  }

  _onPointClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }
}
